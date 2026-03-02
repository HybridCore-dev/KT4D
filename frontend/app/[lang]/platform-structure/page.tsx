"use client";

import Image from "next/image";

import UserActions from "@/actions/user";
import { UserStatus } from "@/actions/user/typing";
import Icon from "@/assets/kt4d-icon.png";
import Button from "@/components/platform/button";
import Container from "@/components/platform/container";
import DocumentList from "@/components/platform/document-list";
import HowGPTTrained from "@/components/platform/how-gpt-trained";
import VideoBG from "@/components/platform/video-bg";
import WhatIsRAG from "@/components/platform/what-is-rag";
import useDictionary from "@/hooks/useDictionary";
import Store from "@/store";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StructureImage from "./assets/structure-image.png";

const TOTAL_STEPS = 4;

export default function Page() {
  const router = useRouter();
  const { locale, dictionary } = useDictionary();
  const [currentStep, setCurrentStep] = useState(0);

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
        newStatus,
      );
      router.push(`/${locale}/document-type-selection`);
    } else console.log("Session could not be found!");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Image
              src={StructureImage}
              width={450}
              alt="Product Structure"
              className="mx-auto mb-12"
            />
            <p className="text-left mb-8">
              {dictionary.platformStructure.text}
            </p>
          </>
        );
      case 1:
        return (
          <>
            {dictionary.documentList.title}
            <DocumentList />
          </>
        );
      case 2:
        return (
          <>
            {dictionary.ragDetails.title}
            <WhatIsRAG />
          </>
        );
      case 3:
        return (
          <>
            {dictionary.gptTrain.title}
            <HowGPTTrained />
          </>
        );
      default:
        return null;
    }
  };

  const backHref =
    currentStep === 0 ? undefined : () => setCurrentStep((prev) => prev - 1);
  const nextHref =
    currentStep !== TOTAL_STEPS - 1
      ? () => setCurrentStep((prev) => prev + 1)
      : undefined;

  const isUserModerator = Store.session.getUserRole() === "MODERATOR";
  return (
    <>
      <Container className="text-center">
        <Image src={Icon} alt="KT4D" height={50} className="mx-auto mb-8" />
        <h3 className="mb-6">{dictionary.platformStructure.title}</h3>
        {renderStepContent()}
        <div className="flex justify-center items-center gap-20">
          <Button
            variant="text"
            disabled={currentStep === 0}
            color="white"
            onClick={backHref}
            className="flex flex-row-reverse items-center gap-2 mt-4 !py-4 !border-2 border-transparent"
          >
            <span>{dictionary.shared.prev}</span>
            <ArrowLeftIcon className="w-5 h-5 text-white" />
          </Button>

          {isUserModerator && currentStep === TOTAL_STEPS - 1 ? (
            <Button
              onClick={handleUpdateUserStatus}
              variant="contained"
              color="primary"
              icon={<ArrowRightIcon className="w-5 h-5" />}
            >
              {dictionary.shared.next}
            </Button>
          ) : (
            currentStep < TOTAL_STEPS - 1 && (
              <Button
                onClick={nextHref}
                variant="contained"
                color="primary"
                icon={<ArrowRightIcon className="w-5 h-5" />}
              >
                {dictionary.shared.next}
              </Button>
            )
          )}
        </div>
      </Container>

      <VideoBG />
    </>
  );
}
