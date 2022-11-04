import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './locales/en-US.json';

const resources = {
	'en-US': enUS
};

i18n.use(initReactI18next).init({
	resources,
	lng: Object.keys(resources).includes(navigator.language) ? navigator.language : 'en-US',
	interpolation: {
		escapeValue: false
	}
});
