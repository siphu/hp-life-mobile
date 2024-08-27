import moment from 'moment';
import i18n from 'i18next';
import {config} from '~/config/config';
import {I18nManager, Platform} from 'react-native';

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

export const date_to_str = (date: moment.Moment | Date): string => {
  const momentDate = moment(date);

  const locale = i18n.language;
  const format = getDateFormat(locale);

  return momentDate.format(format);
};

export const HTMLWrapper = (
  html?: string,
  additionalCss?: string,
  rtl: false | true | 'auto' = 'auto',
) => {
  const fontFile = config.defaultFont.file;
  const fontFamily = config.defaultFont.ios;

  let direction = '';
  if (rtl === true) {
    direction = "dir='rtl'";
  } else if (rtl === 'auto') {
    direction = I18nManager.isRTL ? "dir='rtl'" : '';
  }

  let css = '';

  if (fontFile && fontFamily) {
    const fontFileLocation = Platform.select({
      ios: `${fontFile}`,
      android: `file:///android_asset/fonts/${fontFile}`,
    });

    const fileFormat = (fontFile as string).toLocaleLowerCase().endsWith('.ttf')
      ? 'truetype'
      : 'opentype';

    css = `
      @font-face {
      font-family: '${fontFamily}';
      src: local('FormaDJRMicro-Regular'), url('${fontFileLocation}') format('${fileFormat}');
      }
  `;
  }

  return `<!DOCTYPE html><html ${direction}><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style type="text/css">
        ${css}
        body,html {
          font-family: '${fontFamily}', Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        ${additionalCss ? additionalCss : ''}
        </style>
        </head><body>${html || ''}</body></html>`;
};
