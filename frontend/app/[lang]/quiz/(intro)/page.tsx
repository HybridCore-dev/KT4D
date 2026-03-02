import Button from "@/components/platform/button";
import Container from "@/components/platform/container";
import VideoBG from "@/components/platform/video-bg";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default async function Page({
  searchParams,
  params: { lang },
}: {
  params: { lang: Locale };
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const dictionary = await getDictionary(lang);

  const isFirstPage = page === 1;
  const content = isFirstPage
    ? dictionary.quiz.intro.page1
    : dictionary.quiz.intro.page2;

  const backHref = page === 2 ? `?page=1` : `/${lang}`;
  const nextHref = isFirstPage ? `?page=2` : `/${lang}/quiz/start`;

  return (
    <>
      <Container className="flex flex-row-reverse relative">
        <div className="w-full max-w-3xl mt-10">
          <div className="flex mb-3">
            {[1, 2].map((p) => (
              <div
                key={p}
                className={clsx("rounded-full w-3 h-3 me-1", {
                  "bg-primary": page === p,
                  "bg-white": page !== p,
                })}
              />
            ))}
          </div>

          <h1 className="font-semibold">{content.title}</h1>
          <p className="mt-16 mb-14 text-xl">{content.text}</p>
          <div className="flex justify-center items-center gap-20">
            <Button
              variant="text"
              color="white"
              href={backHref}
              className="flex flex-row-reverse items-center gap-2 mt-4 !py-4 !border-2 border-transparent"
            >
              <span>{dictionary.shared.prev}</span>
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </Button>

            <Button
              href={nextHref}
              variant="contained"
              color="primary"
              icon={<ArrowRightIcon className="w-5 h-5" />}
            >
              {dictionary.shared.next}
            </Button>
          </div>
        </div>
      </Container>
      <VideoBG type="CONTENT" />
    </>
  );
}
