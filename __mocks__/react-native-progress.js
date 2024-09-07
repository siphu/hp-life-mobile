jest.mock('react-native-progress', () => ({
  Bar: jest.fn(() => null),
  Circle: jest.fn(() => null),
  Pie: jest.fn(() => null),
  CircleSnail: jest.fn(() => null),
}));
