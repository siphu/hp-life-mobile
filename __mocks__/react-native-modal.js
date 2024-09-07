jest.mock('react-native-modal', () => {
  return jest.fn(({children}) => children); // Mock the Modal to render its children directly
});
