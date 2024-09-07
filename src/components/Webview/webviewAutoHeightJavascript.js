export default `
(() => {
    
    window.__scriptInjectionGuard = window.__scriptInjectionGuard|| {};
    if (window.__scriptInjectionGuard.webviewAutoHeightAdjustmentInitialized) return;
    window.__scriptInjectionGuard.webviewAutoHeightAdjustmentInitialized = true;

    let lastHeight = 0;
    let timeoutId;

    const updateHeight = function() {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (height !== lastHeight) {
            lastHeight = height;
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'webviewAutoHeightAdjustment', payload: height }));
        }
    };

    const debouncedUpdateHeight = function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateHeight, 100);
    };

    const observer = new MutationObserver(debouncedUpdateHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    debouncedUpdateHeight();

})();
`;
