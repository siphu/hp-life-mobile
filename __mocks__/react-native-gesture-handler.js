jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: jest
      .fn()
      .mockImplementation(({children}) => children),
    Swipeable: jest.fn().mockImplementation(() => null),
    DrawerLayout: jest.fn().mockImplementation(() => null),
    State: {},
    PanGestureHandler: jest.fn().mockImplementation(() => null),
    TapGestureHandler: jest.fn().mockImplementation(() => null),
    FlingGestureHandler: jest.fn().mockImplementation(() => null),
    LongPressGestureHandler: jest.fn().mockImplementation(() => null),
    RotationGestureHandler: jest.fn().mockImplementation(() => null),
    PinchGestureHandler: jest.fn().mockImplementation(() => null),
    ScrollView: jest.fn().mockImplementation(() => null),
    Slider: jest.fn().mockImplementation(() => null),
    Switch: jest.fn().mockImplementation(() => null),
    TextInput: jest.fn().mockImplementation(() => null),
    ToolbarAndroid: jest.fn().mockImplementation(() => null),
    ViewPagerAndroid: jest.fn().mockImplementation(() => null),
    DrawerLayoutAndroid: jest.fn().mockImplementation(() => null),
    WebView: jest.fn().mockImplementation(() => null),
    NativeViewGestureHandler: jest.fn().mockImplementation(() => null),
    BorderlessButton: jest.fn().mockImplementation(() => null),
    BaseButton: jest.fn().mockImplementation(() => null),
    RectButton: jest.fn().mockImplementation(() => null),
    FlatList: jest.fn().mockImplementation(() => null),
    gestureHandlerRootHOC: jest
      .fn()
      .mockImplementation(() => Component => props => <Component {...props} />),
    Directions: {},
  };
});
