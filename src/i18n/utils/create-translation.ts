import { Translation } from "@/i18n/models/translation";

export function createTranslation(value: Partial<Translation> = {}) {
  return {
    en: "",
    nl: "",
    ...value
  };
}
