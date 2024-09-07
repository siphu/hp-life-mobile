jest.mock('../src/providers/TranslationProvider', () => ({
  __esModule: true,
  default: ({children}) => children,
  t: str => str,
}));
