jest.mock('rn-fetch-blob', () => {
  return {
    DocumentDir: jest.fn(),
    polyfill: jest.fn(),
    fs: {
      dirs: {
        DocumentDir: 'mockDocumentDir',
        CacheDir: 'mockCacheDir',
      },
      writeFile: jest.fn(() => Promise.resolve('mockFilePath')),
      readFile: jest.fn(() => Promise.resolve('mockFileContent')),
      unlink: jest.fn(() => Promise.resolve()),
    },
    config: jest.fn(() => ({
      fetch: jest.fn(() =>
        Promise.resolve({
          taskId: 'mockTaskId',
          path: jest.fn(() => 'mockFilePath'),
          json: jest.fn(() => Promise.resolve({key: 'value'})),
        }),
      ),
    })),
    fetch: jest.fn(() =>
      Promise.resolve({
        taskId: 'mockTaskId',
        path: jest.fn(() => 'mockFilePath'),
        json: jest.fn(() => Promise.resolve({key: 'value'})),
      }),
    ),
    base64: {
      encode: jest.fn(() => 'mockBase64'),
      decode: jest.fn(() => 'mockDecodedString'),
    },
    android: {
      addCompleteDownload: jest.fn(),
    },
    ios: {
      openDocument: jest.fn(),
    },
  };
});
