const LOCAL_BASE_URL = "http://localhost:3000";
const OFFLINE_PATH = "/offline/cheomseongdae";
const EXPERIENCE_PATH = "/experience";

function cleanBaseUrl(base: string) {
  return base.replace(/\/$/, "");
}

export function getAudienceTargetUrl(origin?: string) {
  const base =
    process.env.NEXT_PUBLIC_AUDIENCE_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    origin ||
    LOCAL_BASE_URL;

  return `${cleanBaseUrl(base)}${OFFLINE_PATH}`;
}

export function getLocalExperienceTargetUrl(origin?: string) {
  const base = origin || process.env.NEXT_PUBLIC_SITE_URL || LOCAL_BASE_URL;

  return `${cleanBaseUrl(base)}${EXPERIENCE_PATH}`;
}

export function getOfflineTargetUrl(origin?: string) {
  return getAudienceTargetUrl(origin);
}
