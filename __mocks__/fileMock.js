module.exports = 'image-holder-stub';

// Mock the entire icons module
jest.mock('../src/components/MaterialIcons', () => ({
  MaterialIcons: 'MaterialIcons',
  MaterialIconsOutlined: 'MaterialIconsOutlined',
  MaterialSymbolsOutlined: 'MaterialSymbolsOutlined',
}));
