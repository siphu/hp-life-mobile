module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  compact: false,
  plugins: [
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-private-property-in-object',
    'react-native-reanimated/plugin',
    'module:react-native-dotenv',
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    ],
  ],
  overrides: [
    {
      plugins: [
        ['@babel/plugin-transform-class-properties', {loose: true}],
        ['@babel/plugin-transform-private-methods', {loose: true}],
        ['@babel/plugin-transform-private-property-in-object', {loose: true}],
      ],
    },
  ],
};
