export default `
(() => {

    window.__scriptInjectionGuard = window.__scriptInjectionGuard|| {};
    if (window.__scriptInjectionGuard.postMessageInitialized) return;
    window.__scriptInjectionGuard.postMessageInitialized = true;

    // Capture the original postMessage function
    const currentPostMessage = window.parent.postMessage;

    // Override the postMessage function
    window.parent.postMessage = function(e) {
      if (e !== undefined) {
        if (typeof e === 'string') {
          window.ReactNativeWebView.postMessage(e);
        } else {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'postMessage', payload: e }));
        }
      }
      // Call the original postMessage function
      currentPostMessage(e);
    };
})();
`;
