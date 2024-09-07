export default `
(() => {
    if(!document.querySelector("meta[name=viewport]"))
    {
        var meta = document.createElement('meta');
        meta.name="viewport";
        meta.content="width=device-width, initial-scale=1.0, maximum-scale=2.0";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
    document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=2.0');
})();
`;
