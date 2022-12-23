import 'react-i18next';
import type vi from './i18n/vi.json';

declare module 'i18next' {
  // and extend them!
  interface CustomTypeOptions {
    defaultNS: 'vi';
    resources: {
      vi: typeof vi;
    };
  }
}
