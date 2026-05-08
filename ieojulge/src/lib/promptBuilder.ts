import { cheomseongdaeInfo } from "@/data/heritageData";
import { getStyleLabel, styleOptions, type CreationStyle } from "@/data/contentMap";

const blockedTerms = ["violence", "gore", "sexual", "hate"];

export function hasBlockedTerm(input: string) {
  const normalized = input.toLowerCase();
  return blockedTerms.some((term) => normalized.includes(term));
}

export function buildImagePrompt(style: CreationStyle) {
  const option = styleOptions.find((item) => item.id === style) ?? styleOptions[0];

  return [
    "Create a respectful cultural heritage poster of Cheomseongdae observatory in Gyeongju, Korea.",
    "Scene: starry night sky, ancient Silla atmosphere, stone observatory, calm cinematic lighting.",
    `Style: ${getStyleLabel(style)} - ${option.promptHint}.`,
    "Avoid text, logos, modern buildings, people in the foreground, and distorted heritage structure.",
    `Context: ${cheomseongdaeInfo.summary}`,
    "High quality digital illustration, balanced composition, museum exhibition poster mood."
  ].join(" ");
}
