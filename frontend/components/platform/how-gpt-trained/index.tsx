"use client";

import useDictionary from "@/hooks/useDictionary";

export default function HowGPTTrained() {
  const { dictionary } = useDictionary();

  return (
    <div className="container mx-auto  rounded-2xl px-4 md:px-24 py-12 text-center">
      {/* Text */}
      <p className="text-sm md:text-xl font-light mb-8">
        {dictionary.gptTrain.text}
      </p>

      {/* Video */}
      <iframe
        src="https://www.youtube-nocookie.com/embed/Lh0lq750T-s?si=AlwMczKKDk3yfSD_"
        className="w-full aspect-video rounded-2xl"
        title="Profiles used in DDL"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
