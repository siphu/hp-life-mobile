jest.mock('redux-persist', () => ({
  ...jest.requireActual('redux-persist'),
  persistStore: jest.fn(() => ({
    purge: jest.fn(),
    flush: jest.fn(() => Promise.resolve()),
    pause: jest.fn(),
    persist: jest.fn(),
  })),
}));

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({children}) => children, // Render children immediately
}));
