import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['de', 'fa'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
});
