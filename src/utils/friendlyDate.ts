import moment from 'moment';
import i18n from 'i18next';

const date_format = {
  en: 'M/D/YYYY',
  fr: 'DD/MM/YYYY',
  ar: 'D/M/YYYY',
  hi: 'D/M/YYYY',
  pt: 'DD/MM/YYYY',
  es: 'D/M/YYYY',
  'zh-Hans': 'YYYY/M/D',
  id: 'DD/MM/YYYY',
  default: 'M/D/YYYY',
};

const getDateFormat = (() => {
  let cachedLocale = '';
  let cachedFormat = date_format.default;

  return (locale: string) => {
    if (locale !== cachedLocale) {
      cachedLocale = locale;
      cachedFormat =
        date_format[locale as keyof typeof date_format] || date_format.default;
    }
    return cachedFormat;
  };
})();

export const friendlyDate = (date: moment.Moment | Date): string => {
  const momentDate = moment(date);

  const locale = i18n.language;
  const format = getDateFormat(locale);

  return momentDate.format(format);
};
