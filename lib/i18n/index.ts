export type { Locale } from './config';
export { defaultLocale, locales } from './config';

import type { Locale } from './config';

const dictionaries = {
	en: () => import('./en').then((m) => m.default),
	pt: () => import('./pt').then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export const getDictionary = (locale: Locale) => dictionaries[locale]();
