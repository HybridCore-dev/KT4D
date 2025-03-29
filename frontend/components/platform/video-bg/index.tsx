import { Props } from "./typing";

export default function VideoBG({ type = "COMMON" }: Props) {
  let src = "/video-bg.webm";

  if (type === "HOME") src = "/video-bg-home.webm";
  else if (type === "CONTENT") src = "/video-bg-content.webm";

  return (
    <video
      loop
      autoPlay
      muted
      playsInline
      className="fixed top-0 left-0 min-w-full min-h-full -z-10 object-cover"
    >
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
