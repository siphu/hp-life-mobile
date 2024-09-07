module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native-reanimated|react-native|react-redux|@react-native|@react-navigation|@expo|expo)/)', // Ensure these modules are transformed
  ],
  setupFilesAfterEnv: ['./jest.setupTest.js'],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/mocks/'],
};
