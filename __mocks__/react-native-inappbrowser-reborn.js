jest.mock('react-native-inappbrowser-reborn', () => {
  return {
    open: jest.fn(() => Promise.resolve()),
    close: jest.fn(),
    isAvailable: jest.fn(() => Promise.resolve(true)),
    openAuth: jest.fn(() => Promise.resolve({type: 'success'})),
    closeAuth: jest.fn(),
  };
});
