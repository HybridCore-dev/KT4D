"use client";

import Image from "next/image";
import Lottie from "react-lottie";
import Button from "@/components/platform/button";
import Icon from "@/assets/kt4d-icon.png";
import Logo from "@/assets/kt4d-text.png";
import * as LoadingAnimation from "../../../../assets/loading.json";

import { Props } from "./typing";
import PrintIcon from "./print-icon";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function AppMessage({ message }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const getPageMargins = () => {
    return `@page { margin: 1in !important; } `;
  };

  return (
    <>
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-secondary-light/15 p-1 mr-2">
          <Image src={Icon} alt="KT4D" height={24} />
        </div>
        <Image src={Logo} alt="KT4D" height={14} />
      </div>
      <div className="flex mb-5">
        {message.loading ? (
          <div className="w-32 bg-secondary-light/15 rounded-3xl px-6 py-1">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: LoadingAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={36}
              width={36}
            />
          </div>
        ) : (
          <>
            <div
              ref={ref}
              className="max-w-[80%] bg-secondary-light/15 rounded-3xl px-6 py-4 whitespace-pre-wrap print:max-w-full print:bg-transparent print:text-black print:text-justify"
            >
              {message.text}
              <style>{getPageMargins()}</style>
            </div>
          </>
        )}
      </div>

      {!message.loading && (
        <ReactToPrint
          documentTitle="KT4D"
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return (
              <Button variant="outlined" color="white" className="mb-10">
                <PrintIcon />
                Print
              </Button>
            );
          }}
          content={() => ref.current}
        />
      )}
    </>
  );
}
