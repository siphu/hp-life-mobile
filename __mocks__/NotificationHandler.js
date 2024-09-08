jest.mock('../src/providers/NotificationProvider', () => ({
  __esModule: true,
  default: ({children}) => children,
}));
