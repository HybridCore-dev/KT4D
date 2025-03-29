import { useMemo } from "react";
import { i18n, Locale } from "@/i18n-config";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/get-dictionary";

import DictionaryEn from "@/dictionaries/en.json";
import DictionaryEs from "@/dictionaries/es.json";
import DictionaryPl from "@/dictionaries/pl.json";

export default function useDictionary() {
  const pathName = usePathname();

  const locale: Locale = useMemo(() => {
    const segments = pathName.split("/");
    if (segments[1]) return segments[1] as Locale;

    return i18n.defaultLocale;
  }, [pathName]);

  const dictionary = useMemo(() => {
    let dictionary = DictionaryEn as Awaited<ReturnType<typeof getDictionary>>;
    if (locale === "es") dictionary = DictionaryEs;
    if (locale === "pl") dictionary = DictionaryPl;
    return dictionary;
  }, [locale]);

  return {
    locale,
    dictionary,
  };
}
