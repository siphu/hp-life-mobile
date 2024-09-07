jest.mock('react-native-url-polyfill', () => ({
  default: {
    URL: global.URL, // Use the native URL implementation or a custom mock if needed
  },
  polyfill: jest.fn(), // Mock the polyfill function
}));
