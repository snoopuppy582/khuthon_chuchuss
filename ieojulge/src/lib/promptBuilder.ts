import { cheomseongdaeInfo } from "@/data/heritageData";
import { getStyleLabel, styleOptions, type CreationStyle } from "@/data/contentMap";

const blockedTerms = ["violence", "gore", "sexual", "hate"];

export function hasBlockedTerm(input: string) {
  const normalized = input.toLowerCase();
  return blockedTerms.some((term) => normalized.includes(term));
}

function cleanCustomPrompt(customPrompt?: string) {
  return customPrompt?.replace(/\s+/g, " ").trim().slice(0, 700);
}

export function buildImagePrompt(style: CreationStyle, customPrompt?: string) {
  const option = styleOptions.find((item) => item.id === style) ?? styleOptions[0];
  const userPrompt = cleanCustomPrompt(customPrompt);

  return [
    "Create a respectful cultural heritage poster of Cheomseongdae observatory in Gyeongju, Korea.",
    "Scene: starry night sky, ancient Silla atmosphere, stone observatory, calm cinematic lighting.",
    `Style: ${getStyleLabel(style)} - ${option.promptHint}.`,
    userPrompt ? `User creative direction: ${userPrompt}` : null,
    "Avoid text, logos, modern buildings, people in the foreground, and distorted heritage structure.",
    `Context: ${cheomseongdaeInfo.summary}`,
    "High quality digital illustration, balanced composition, museum exhibition poster mood."
  ].filter(Boolean).join(" ");
}
