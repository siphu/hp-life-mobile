jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(() => [
    {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
  ]),
  findBestAvailableLanguage: jest.fn(() => ({
    languageTag: 'en-US',
    isRTL: false,
  })),
  getNumberFormatSettings: jest.fn(() => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  })),
  getCalendar: jest.fn(() => 'gregorian'),
  getCountry: jest.fn(() => 'US'),
  getCurrencies: jest.fn(() => ['USD']),
  getTemperatureUnit: jest.fn(() => 'fahrenheit'),
  getTimeZone: jest.fn(() => 'America/New_York'),
  uses24HourClock: jest.fn(() => false),
  usesMetricSystem: jest.fn(() => false),
  usesAutoDateAndTime: jest.fn(() => true),
  usesAutoTimeZone: jest.fn(() => true),
}));
