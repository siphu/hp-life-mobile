jest.mock('@react-native-firebase/app', () => ({
  firebase: {
    app: jest.fn(() => ({
      initializeApp: jest.fn(),
    })),
  },
}));

jest.mock('@react-native-firebase/analytics', () => ({
  logEvent: jest.fn(() => Promise.resolve()),
  setUserId: jest.fn(() => Promise.resolve()),
  setUserProperties: jest.fn(() => Promise.resolve()),
  setCurrentScreen: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    getToken: jest.fn(() => Promise.resolve('mockToken')),
    onMessage: jest.fn(() => jest.fn()), // Mock the event listener
    onTokenRefresh: jest.fn(() => jest.fn()), // Mock the token refresh listener
    requestPermission: jest.fn(() => Promise.resolve(true)),
    hasPermission: jest.fn(() => Promise.resolve(true)),
    isDeviceRegisteredForRemoteMessages: true,
    registerDeviceForRemoteMessages: jest.fn(() => Promise.resolve()),
    subscribeToTopic: jest.fn(() => Promise.resolve()),
    unsubscribeFromTopic: jest.fn(() => Promise.resolve()),
  });
});
