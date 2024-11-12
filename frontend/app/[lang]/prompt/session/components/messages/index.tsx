import Image from "next/image";

import Icon from "@/assets/kt4d-icon.png";
import { Props } from "./typing";
import UserMessage from "./components/user-message";
import AppMessage from "./components/app-message";

export default function Messages({ messages }: Props) {
  return (
    <div className="container mx-auto max-w-[990px]">
      {messages.length === 0 && (
        <div className="text-center">
          <Image src={Icon} alt="KT4D" height={60} className="mx-auto mb-8" />
          <h3 className="mb-8">Democracy Demonstrator</h3>
        </div>
      )}

      {messages.map((message) =>
        message.sender === "USER" ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AppMessage key={message.id} message={message} />
        )
      )}
    </div>
  );
}
