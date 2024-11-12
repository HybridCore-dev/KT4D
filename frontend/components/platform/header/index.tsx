import Image from "next/image";
import Logo from "@/assets/kt4d-logo.png";
import Link from "next/link";
import Container from "../container";
import LanguageSelector from "../language-selector";
import { headers } from "next/headers";
import clsx from "clsx";

export default async function Header() {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const pathname = fullUrl ? new URL(fullUrl).pathname : "";

  const isPromptPage = pathname.includes("/prompt/session");

  return (
    <section className="">
      <Container className="py-7 flex justify-between items-center">
        <Link href="/" className="inline-block">
          <Image src={Logo} width={154} height={59} alt="KT4D" />
        </Link>

        <div
          className={clsx({
            "hidden md:block": isPromptPage,
          })}
        >
          <LanguageSelector />
        </div>
      </Container>
    </section>
  );
}
