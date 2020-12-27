import i18n from "@/i18n/i18n";

type LanguageCodes = "en" | "nl";

interface Language {
  code: LanguageCodes;
  label: string;
}

export const languages: Language[] = [
  {
    code: "en",
    label: i18n.t("English").toString()
  },
  {
    code: "nl",
    label: i18n.t("Dutch").toString()
  }
];
