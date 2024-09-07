jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(() => Promise.resolve()),
  show: jest.fn(() => Promise.resolve()),
  getVisibilityStatus: jest.fn(() => Promise.resolve('hidden')), // Or 'visible' based on your use case
}));
