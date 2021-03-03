import { Translation } from "@/i18n/models/translation";
import i18n from "@/i18n/i18n";

interface WorkingCircle {
  id: number;
  title: Translation;
}

export function extractWorkingCircleTitle(
  workingCircle: WorkingCircle
): string {
  return workingCircle.title[i18n.locale];
}
