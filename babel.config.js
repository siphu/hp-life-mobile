module.exports = {
  presets: ['module:@react-native/babel-preset'],
  compact: false,
  plugins: [
    'module:react-native-dotenv',
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
