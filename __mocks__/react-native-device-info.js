jest.mock('react-native-device-info', () => ({
  getUniqueId: jest.fn(() => 'mockUniqueId'),
  getSystemName: jest.fn(() => 'mockSystemName'),
  getSystemVersion: jest.fn(() => 'mockSystemVersion'),
  getBrand: jest.fn(() => 'mockBrand'),
  getModel: jest.fn(() => 'mockModel'),
  getDeviceName: jest.fn(() => Promise.resolve('mockDeviceName')),
  getDeviceId: jest.fn(() => 'mockDeviceId'),
  isEmulator: jest.fn(() => Promise.resolve(false)),
  hasNotch: jest.fn(() => false),
  isTablet: jest.fn(() => false),
}));
