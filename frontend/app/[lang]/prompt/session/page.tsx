"use client";

import VideoBG from "@/components/platform/video-bg";
import Input from "./components/input";
import Messages from "./components/messages";
import Container from "@/components/platform/container";
import { useEffect, useRef, useState } from "react";
import { DocumentType } from "@/actions/prompt/typing";
import Store from "@/store";
import { IMessage } from "./components/messages/typing";
import PromptActions from "@/actions/prompt";
import Button from "@/components/platform/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FullscreenLoading from "@/components/platform/fullscreen-loading";
import SessionActions from "@/actions/session";
import { useRouter } from "next/navigation";
import { alert, confirm } from "@/components/platform/confirm";
import useDictionary from "@/hooks/useDictionary";

export default function Page() {
  const router = useRouter();
  const { locale, dictionary } = useDictionary();
  const [documentTypes, setDocumentTypes] = useState<DocumentType[] | null>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const documentTypes = Store.session.getDocumentTypes();
    setDocumentTypes(documentTypes);
  }, []);

  const onSendMessage = async (text: string) => {
    const session = Store.session.get();

    if (documentTypes === null || documentTypes.length === 0) {
      console.log("Document type could not be found!");
      return;
    }

    if (session) {
      const newMesssage: IMessage = {
        id: messages.length + 1,
        sender: "USER",
        text,
      };
      const loadingMessage: IMessage = {
        id: messages.length + 2,
        sender: "APP",
        text: "",
        loading: true,
      };
      const newMessages: IMessage[] = [...messages, newMesssage];
      setMessages([...newMessages, loadingMessage]);
      setTimeout(() => {
        messagesRef.current?.scrollTo({
          top: messagesRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 250);
      const response = await PromptActions.ask(locale, {
        ...session,
        documentTypes,
        prompt: text,
      });
      if (!response.success) alert("Error!", "Please try again!");
      else {
        newMessages.push({
          id: newMessages.length + 1,
          sender: "APP",
          text: response.data.answer,
        });
      }
      setMessages(newMessages);
      if (newMessages.length > 2) {
        setTimeout(() => {
          messagesRef.current?.scrollTo({
            top:
              messagesRef.current.scrollTop +
              messagesRef.current.clientHeight -
              150,
            behavior: "smooth",
          });
        }, 250);
      }
    } else console.log("Session could not be found!");
  };

  const onEndSession = async () => {
    if (await confirm("Session will be ended!", "Are you sure?")) {
      setLoading(true);
      const session = Store.session.get();
      if (session) {
        const response = await SessionActions.end(session);
        if (response.success) {
          Store.session.remove();
          router.push(`/${locale}`);
        } else alert("Error!", "Session could not be ended!");
      } else alert("Error!", "Session could not be found!");
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="relative md:max-w-[990px]">
        <Button
          className="absolute -top-[92px] right-4 md:right-56 lg:right-6"
          size="small"
          icon={<XMarkIcon className="h-4 w-4" />}
          onClick={onEndSession}
        >
          {dictionary.shared.finish}
        </Button>
      </Container>
      <div
        ref={messagesRef}
        className="fixed top-[116px] left-0 right-0 bottom-24 overflow-y-auto px-4 md:px-0 z-0"
      >
        <Messages messages={messages} />
        <div ref={messagesEndRef}></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-24">
        <Container className="lg:max-w-[990px]">
          <Input onSubmit={onSendMessage} />
        </Container>
      </div>
      <VideoBG />
      {loading && <FullscreenLoading />}
    </>
  );
}
