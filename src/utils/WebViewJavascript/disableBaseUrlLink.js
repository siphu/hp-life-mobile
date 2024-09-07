import {config} from '~/config/config';
import {getAvailableLanguages} from '~/translations';

/**
 * This disables the link in a webview that links to the base url of the webUrl
 */
export default `
(() => {

    window.__scriptInjectionGuard = window.__scriptInjectionGuard|| {};
    if (window.__scriptInjectionGuard.disableBaseUrlInitialized) return;
    window.__scriptInjectionGuard.disableBaseUrlInitialized = true;

    const isBaseURL = (webUrl, url, locales) => {
        const normalizeUrl = (u) => u.toLowerCase().replace(/\\/$/, '');

        const normalizedWebUrl = normalizeUrl(webUrl);
        const normalizedUrl = normalizeUrl(url);

        if (normalizedUrl === normalizedWebUrl) {
            return true;
        }

        return locales.some(locale => normalizedUrl === normalizedWebUrl + "/" + locale.toLowerCase());
    }

    function handleLinkClick(event) {
        console.log('Checking link:', this.href);
        const result = isBaseURL("${config.api.webUrl}", this.href, ${JSON.stringify(getAvailableLanguages())});
        if (result) {
            event.preventDefault();
            console.log('Link click prevented: ' + this.href);
            return false;
        }
    }

    function applyLinkHandlers() {
        document.querySelectorAll('a').forEach(a => {
            a.onclick = handleLinkClick;
        });
    }

    // Apply handlers to initial links
    applyLinkHandlers();

    // Set up a MutationObserver to monitor for dynamically added links
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'A') {
                        node.onclick = handleLinkClick;
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll('a').forEach(a => {
                            a.onclick = handleLinkClick;
                        });
                    }
                });
            }
        });
    });
    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
  `;
