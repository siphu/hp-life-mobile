export default `
(() => {

    let mobileStart = document.getElementById('mobile-start-container') != undefined || 
    (
        document.getElementById('overlay-container-controls') != undefined &&
        document.getElementById('overlay-mobile') != undefined
    );

    let hasMain = document.querySelector('main') != undefined;
    let hasIFrame = document.getElementById('analytics-frame') != undefined;

    let widthMain = hasMain ? document.querySelector('main').offsetWidth : undefined;
    let heightMain = hasMain ? document.querySelector('main').offsetHeight : undefined;

    let widthIframe = hasIFrame ? document.getElementById('analytics-frame').offsetWidth : undefined;
    let heightIframe =  hasIFrame ? document.getElementById('analytics-frame').offsetHeight : undefined;

    let mainSize = hasMain ? {
                            width: widthMain,
                            height: heightMain
                            } : undefined;

    let iframeSize = hasIFrame ? {
                                width: widthIframe,
                                height: heightIframe
                                } : undefined;

    window.ReactNativeWebView.postMessage(JSON.stringify(
    {
        type: 'contentSize',
        payload: {
            mobileStart: mobileStart,
            bodyHeight: document.body.scrollHeight,
            mainSize: mainSize,
            iframeSize: iframeSize
        }
    }
    ));

})();
`;
