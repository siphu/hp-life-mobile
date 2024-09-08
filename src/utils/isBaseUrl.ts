import { getAvailableLanguages } from '~/translations';
/**
 * This checks to see if a given URL is a base URL with or without the locale
 * @param baseUrl base url
 * @param url url to see if base url
 * @returns boolean
 */
export function isBaseUrl(baseUrl: string, url: string): boolean {
  const locales = getAvailableLanguages();

  const normalizeUrl = (u: string) => u.toLowerCase().replace(/\/$/, '');

  const normalizedWebUrl = normalizeUrl(baseUrl);
  const normalizedUrl = normalizeUrl(url);

  if (normalizedUrl === normalizedWebUrl) {
    return true;
  }

  return locales.some(
    locale => normalizedUrl === `${normalizedWebUrl}/${locale.toLowerCase()}`,
  );
}
