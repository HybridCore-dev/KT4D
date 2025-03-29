import Button from "@/components/platform/button";
import Container from "@/components/platform/container";
import VideoBG from "@/components/platform/video-bg";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import _ from "lodash";

export default async function Page({
  searchParams,
  params: { lang },
}: {
  params: { lang: Locale };
  searchParams: {
    page: number;
  };
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Container className="flex flex-row-reverse">
        <div className="w-full max-w-3xl mt-10">
          <div className="flex mb-3">
            {_.times(2, (pageNum) => (
              <div
                key={pageNum}
                className={clsx("rounded-full w-3 h-3 me-1", {
                  "bg-primary": page === pageNum + 1,
                  "bg-white": page !== pageNum + 1,
                })}
              ></div>
            ))}
          </div>
          {page === 1 && (
            <>
              <h1 className="font-semibold">
                {dictionary.quiz.intro.page1.title}
              </h1>
              <p className="mt-16 mb-14 text-xl">
                {dictionary.quiz.intro.page1.text}
              </p>
              <Button
                href="?page=2"
                icon={<ArrowRightIcon className="w-5 h-5" />}
              >
                {dictionary.shared.next}
              </Button>
            </>
          )}

          {page === 2 && (
            <>
              <h1 className="font-semibold">
                {dictionary.quiz.intro.page2.title}
              </h1>
              <p className="mt-16 mb-14 text-xl">
                {dictionary.quiz.intro.page2.text}
              </p>
              <Button
                href={`/${lang}/quiz/start`}
                icon={<ArrowRightIcon className="w-5 h-5" />}
              >
                {dictionary.shared.next}
              </Button>
            </>
          )}
        </div>
      </Container>
      <VideoBG type="CONTENT" />
    </>
  );
}
