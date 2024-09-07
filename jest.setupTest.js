const fs = require('fs');
const path = require('path');

// Dynamically require all mock files in the __tests__/mocks/ directory
const mocksDir = path.resolve(__dirname, '__mocks__');

fs.readdirSync(mocksDir).forEach(file => {
  const filePath = path.join(mocksDir, file);
  if (filePath.endsWith('.js')) {
    require(filePath);
  }
});
