jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@react-navigation/stack', () => {
  const actualNav = jest.requireActual('@react-navigation/stack');
  return {
    ...actualNav,
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn().mockImplementation(({children}) => children),
      Screen: jest.fn().mockImplementation(({children}) => children),
    }),
  };
});

jest.mock('@react-navigation/drawer', () => {
  const actualNav = jest.requireActual('@react-navigation/drawer');
  return {
    ...actualNav,
    createDrawerNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn().mockImplementation(({children}) => children),
      Screen: jest.fn().mockImplementation(({children}) => children),
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  const actualNav = jest.requireActual('@react-navigation/bottom-tabs');
  return {
    ...actualNav,
    createBottomTabNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn().mockImplementation(({children}) => children),
      Screen: jest.fn().mockImplementation(({children}) => children),
    }),
  };
});
