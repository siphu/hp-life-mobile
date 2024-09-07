jest.mock('@react-native-community/netinfo', () => {
  const NetInfo = {
    configure: jest.fn(), // Mock configure method
    fetch: jest.fn(() => Promise.resolve({isConnected: true})),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    useNetInfo: jest.fn(() => ({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    })),
  };
  return NetInfo;
});
