import { DOCS_URL } from "@workspace/consts";

export function localizeDocsUrl(url: string, locale: string): string {
  if (locale === "en" || !url.startsWith(DOCS_URL)) return url;
  return `${DOCS_URL}/${locale}${url.slice(DOCS_URL.length)}`;
}
