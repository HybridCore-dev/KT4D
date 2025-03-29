import { Props } from "./typing";

export default function UserMessage({ message }: Props) {
  return (
    <div className="flex flex-row-reverse mb-10">
      <div className="max-w-[80%] bg-primary rounded-3xl px-6 py-3">
        {message.text}
      </div>
    </div>
  );
}
