jest.mock('react-native-linear-gradient', () => {
  const LinearGradient = ({children}) => children;
  return LinearGradient;
});

jest.mock('../src/screens/Login/helper.ts', () => ({
  openBrowser: jest.fn(),
}));
