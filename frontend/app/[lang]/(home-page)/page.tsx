import Button from "@/components/platform/button";
import Container from "@/components/platform/container";
import VideoBG from "@/components/platform/video-bg";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Container>
        <div className="max-w-4xl">
          <h1 className="mt-16 mb-11">{dictionary.home.title}</h1>
          <Button href={`${lang}/quiz`}>{dictionary.home.action}</Button>
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mt-24">
            <div className="px-7 border-l border-white text-xl py-1 mb-5">
              {dictionary.home.featured1}
            </div>
            <div className="px-7 border-l border-white text-xl py-1  mb-5">
              {dictionary.home.featured2}
            </div>
          </div>
        </div>
      </Container>
      <VideoBG type="HOME" />
    </>
  );
}
