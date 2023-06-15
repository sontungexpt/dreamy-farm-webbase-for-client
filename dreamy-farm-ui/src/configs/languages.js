import english from '~/languages/jsons/english.json';
import vietnamese from '~/languages/jsons/vietnamese.json';

const languages = {
  en: {
    i18nType: 'en',
    title: 'English',
    translations: english,
  },
  vn: {
    i18nType: 'vn',
    title: 'Vietnamese',
    translations: vietnamese,
  },
};

export default languages;
