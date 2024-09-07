jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(() => Promise.resolve(true)),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),
  onBackgroundEvent: jest.fn(() => Promise.resolve()),
  displayNotification: jest.fn(() => Promise.resolve()),
  cancelNotification: jest.fn(() => Promise.resolve()),
  createChannel: jest.fn(() => Promise.resolve('default')),
  deleteChannel: jest.fn(() => Promise.resolve()),
  getChannels: jest.fn(() => Promise.resolve([])),
}));
