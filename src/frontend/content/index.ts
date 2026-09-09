import { SiteContent } from './types';
import { CONTENT_VI } from './content.vi';
import { CONTENT_EN } from './content.en';

export * from './types';
export { CONTENT_VI } from './content.vi';
export { CONTENT_EN } from './content.en';

export const DICTIONARY: Record<'vi' | 'en', SiteContent> = {
  vi: CONTENT_VI,
  en: CONTENT_EN,
};

export function getContent(locale: 'vi' | 'en'): SiteContent {
  return DICTIONARY[locale] || CONTENT_VI;
}
