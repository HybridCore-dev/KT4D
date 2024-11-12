"use client";

import Image from "next/image";

import Icon from "@/assets/kt4d-icon.png";
import Button from "@/components/platform/button";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";

import NewspaperIcon from "./assets/icon-newspaper.svg";
import DiplomaIcon from "./assets/icon-diploma.svg";
import InsuranceIcon from "./assets/icon-insurance-policy.svg";
import VideoBG from "@/components/platform/video-bg";
import Container from "@/components/platform/container";
import { useEffect, useState } from "react";
import { DocumentType } from "@/actions/prompt/typing";
import Store from "@/store";
import { useRouter } from "next/navigation";
import { alert } from "@/components/platform/confirm";
import useDictionary from "@/hooks/useDictionary";
import { UserStatus, UserStatusHistory } from "@/actions/user/typing";
import UserActions from "@/actions/user";
import FullscreenLoading from "@/components/platform/fullscreen-loading";

export default function Page() {
  const router = useRouter();
  const { dictionary, locale } = useDictionary();
  const [documentType, setDocumentType] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(fetchData, 50);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const fetchData = async () => {
    const session = Store.session.get();
    if (session) {
      const response = await UserActions.getStatus(
        session.userId,
        session.sessionId
      );
      if (response.success) {
        const history = response.data.history.find(
          (item) => item.step === "DOCUMENT_TYPE_SELECTION"
        );
        if (history) {
          const documentType = history.details as DocumentType[];
          setDocumentType(documentType);
        }
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const newDocumentType = [...documentType];
    if (checked && !newDocumentType.includes(value as DocumentType)) {
      newDocumentType.push(value as DocumentType);
    }
    if (!checked && newDocumentType.includes(value as DocumentType)) {
      const index = newDocumentType.findIndex((item) => item === value);
      newDocumentType.splice(index, 1);
    }
    setDocumentType(newDocumentType);

    const session = Store.session.get();
    if (session) {
      const currentStatus = Store.session.getUserStatus();
      const historyStep: UserStatusHistory = {
        step: "DOCUMENT_TYPE_SELECTION",
        details: newDocumentType,
      };
      const newStatus: UserStatus = {
        current: "DOCUMENT_TYPE_SELECTION",
        next: "PROMPT",
        history: currentStatus
          ? [
              ...currentStatus.history.filter(
                (item) => item.step !== "DOCUMENT_TYPE_SELECTION"
              ),
              historyStep,
            ]
          : [historyStep],
      };
      UserActions.saveStatus(session.userId, session.sessionId, newStatus);
    }
  };

  const onSubmit = async () => {
    if (Store.session.setDocumentTypes(documentType)) {
      const session = Store.session.get();
      if (session) {
        setLoading(true);
        const currentStatus = Store.session.getUserStatus();
        const newStatus: UserStatus = {
          current: "PROMPT",
          next: "PROMPT",
          history: currentStatus ? currentStatus.history : [],
        };
        await UserActions.saveStatus(
          session.userId,
          session.sessionId,
          newStatus
        );
        setLoading(false);
        router.push(`/${locale}/prompt/session`);
      } else console.log("Session could not be found!");
    } else alert("Error!", "Document types could not be saved!");
    setLoading(false);
  };

  return (
    <>
      <Container className="text-center">
        <Image src={Icon} alt="KT4D" height={60} className="mx-auto mb-8" />
        <h3 className="mb-8">{dictionary.documentTypeSelection.title}</h3>
        <p className="mb-20">{dictionary.documentTypeSelection.text}</p>

        <div className="block md:flex justify-center mb-20">
          <label className="flex flex-col justify-center items-center border border-white/50 rounded-2xl w-[200px] h-[150px] group transition-all hover:border-white/75 hover:bg-white/10 relative has-[:checked]:border-secondary cursor-pointer mb-6 mx-auto md:mx-4">
            <input
              type="checkbox"
              name="documentType"
              value="NEWSLETTER_ARTICLES"
              checked={documentType.includes("NEWSLETTER_ARTICLES")}
              className="peer hidden"
              onChange={onChange}
            />
            <span className="opacity-0 peer-checked:opacity-100 bg-secondary rounded-full absolute -top-2 -left-2 p-1 transition-all">
              <CheckIcon className="w-5 h-5" />
            </span>
            <Image
              src={NewspaperIcon}
              alt={dictionary.documentTypeSelection.newspaper}
              className="mb-4 opacity-50 group-hover:opacity-100 group-has-[:checked]:opacity-100 transition-all"
            />
            <span>{dictionary.documentTypeSelection.newspaper}</span>
          </label>

          <label className="flex flex-col justify-center items-center border border-white/50 rounded-2xl w-[200px] h-[150px] group transition-all hover:border-white/75 hover:bg-white/10 relative has-[:checked]:border-secondary cursor-pointer mb-6 mx-auto md:mx-4">
            <input
              type="checkbox"
              name="documentType"
              className="peer hidden"
              value="ACADEMIC_PAPERS"
              checked={documentType.includes("ACADEMIC_PAPERS")}
              onChange={onChange}
            />
            <span className="opacity-0 peer-checked:opacity-100 bg-secondary rounded-full absolute -top-2 -left-2 p-1 transition-all">
              <CheckIcon className="w-5 h-5" />
            </span>
            <Image
              src={DiplomaIcon}
              alt={dictionary.documentTypeSelection.academic}
              className="mb-4 opacity-50 group-hover:opacity-100 group-has-[:checked]:opacity-100 transition-all"
            />
            <span>{dictionary.documentTypeSelection.academic}</span>
          </label>

          <label className="flex flex-col justify-center items-center border border-white/50 rounded-2xl w-[200px] h-[150px] group transition-all hover:border-white/75 hover:bg-white/10 relative has-[:checked]:border-secondary cursor-pointer mb-6 mx-auto md:mx-4">
            <input
              type="checkbox"
              name="documentType"
              className="peer hidden"
              value="POLICY_PAPERS"
              checked={documentType.includes("POLICY_PAPERS")}
              onChange={onChange}
            />
            <span className="opacity-0 peer-checked:opacity-100 bg-secondary rounded-full absolute -top-2 -left-2 p-1 transition-all">
              <CheckIcon className="w-5 h-5" />
            </span>
            <Image
              src={InsuranceIcon}
              alt={dictionary.documentTypeSelection.policy}
              className="mb-4 opacity-50 group-hover:opacity-100 group-has-[:checked]:opacity-100 transition-all"
            />
            <span>{dictionary.documentTypeSelection.policy}</span>
          </label>
        </div>

        <div className="mb-32">
          <Button
            icon={<ArrowRightIcon className="w-5 h-5" />}
            disabled={documentType.length === 0 || loading}
            onClick={onSubmit}
          >
            {dictionary.shared.next}
          </Button>
        </div>
      </Container>

      <FullscreenLoading show={loading} />

      <VideoBG />
    </>
  );
}
