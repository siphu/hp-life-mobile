module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native-reanimated|react-native|react-redux|@react-native|@react-navigation|react-navigation|@react-navigation/.*|@expo|expo|react-native-safe-area-context)/)', // Ensure these modules are transformed
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setupTest.js',
  ],
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/mocks/'],
};
