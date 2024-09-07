jest.mock('react-native-share', () => ({
  open: jest.fn(() =>
    Promise.resolve({
      message: 'Mock share success',
    }),
  ),
  shareSingle: jest.fn(() =>
    Promise.resolve({
      message: 'Mock shareSingle success',
    }),
  ),
  isPackageInstalled: jest.fn(() =>
    Promise.resolve({
      isInstalled: true,
      message: 'Mock package installed',
    }),
  ),
}));
