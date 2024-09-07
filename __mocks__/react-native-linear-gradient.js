jest.mock('react-native-linear-gradient', () => {
  const LinearGradient = ({children}) => children;
  return LinearGradient;
});
