import type { Metadata } from "next";
import Header from "@/components/platform/header";
import clsx from "clsx";
import { defaultFont } from "@/app/fonts";

import { i18n, type Locale } from "../../i18n-config";

import "../globals.css";

export const metadata: Metadata = {
  title: "KT4D",
  description: "Knowledge Techonologies for Democracy",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={clsx(defaultFont.className, "antialiased")}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
