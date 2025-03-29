"use client";

import Image from "next/image";

import Icon from "@/assets/kt4d-icon.png";
import StructureImage from "./assets/structure-image.png";
import Button from "@/components/platform/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import VideoBG from "@/components/platform/video-bg";
import Container from "@/components/platform/container";
import Store from "@/store";
import useDictionary from "@/hooks/useDictionary";
import DocumentList from "@/components/platform/document-list";
import WhatIsRAG from "@/components/platform/what-is-rag";
import HowGPTTrained from "@/components/platform/how-gpt-trained";
import { UserStatus } from "@/actions/user/typing";
import UserActions from "@/actions/user";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { locale, dictionary } = useDictionary();

  const handleUpdateUserStatus = async () => {
    const session = Store.session.get();
    if (session) {
      const currentStatus = Store.session.getUserStatus();
      const newStatus: UserStatus = {
        current: "DOCUMENT_TYPE_SELECTION",
        next: "PROMPT",
        history: currentStatus ? currentStatus.history : [],
      };
      await UserActions.saveStatus(
        session.userId,
        session.sessionId,
        newStatus
      );
      router.push(`/${locale}/document-type-selection`);
    } else console.log("Session could not be found!");
  };

  return (
    <>
      <Container className="text-center">
        <Image src={Icon} alt="KT4D" height={60} className="mx-auto mb-8" />
        <h3 className="mb-8">{dictionary.platformStructure.title}</h3>
        <Image
          src={StructureImage}
          width={700}
          alt="Product Structure"
          className="mx-auto mb-12"
        />
        <p className="text-left mb-8">{dictionary.platformStructure.text}</p>

        {Store.session.getUserRole() === "MODERATOR" && (
          <div>
            <Button
              icon={<ArrowRightIcon className="w-5 h-5" />}
              onClick={handleUpdateUserStatus}
            >
              {dictionary.shared.next}
            </Button>
          </div>
        )}

        <div className="flex justify-center my-32">
          <div className="mx-4">
            <DocumentList />
          </div>
          <div className="mx-4">
            <WhatIsRAG />
          </div>
          <div className="mx-4">
            <HowGPTTrained />
          </div>
        </div>
      </Container>

      <VideoBG />
    </>
  );
}
