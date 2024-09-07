export default `
(() => {

    window.__scriptInjectionGuard = window.__scriptInjectionGuard|| {};
    if (window.__scriptInjectionGuard.documentReadyInitialized) return;
    window.__scriptInjectionGuard.documentReadyInitialized = true;

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function sendDocumentReadyMessage(url) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'documentReady', 
            payload: url 
        }));
    }

    const debouncedSendDocumentReadyMessage = debounce(sendDocumentReadyMessage, 300);

    const currentUrl = window.location.href;

    if (document.readyState === 'complete') {
        debouncedSendDocumentReadyMessage(currentUrl);
    } else {
        document.addEventListener('readystatechange', function onReadyStateChange() {
            if (document.readyState === 'complete') {
                debouncedSendDocumentReadyMessage(currentUrl);
                document.removeEventListener('readystatechange', onReadyStateChange);
            }
        });
    }
})();
`;
