(function(window, document, undefined) {

    var gaLinks = document.querySelectorAll('.js-ga'),
        i = gaLinks.length;

    while (i--) {
        addListener(gaLinks[i], 'click', function(e) {
            var self = this,
                site = self.getAttribute('data-site');
            ga('send', 'event', 'link', 'click', site);
        }, false);
    };

    function addListener(element, type, callback) {
        if (element.addEventListener) element.addEventListener(type, callback);
        else if (element.attachEvent) element.attachEvent('on' + type, callback);
    }

    function getProperties(el, pseudo, prop) {
        return window.getComputedStyle(el, pseudo || null).getPropertyValue(prop);
    };

    function vhUnits() {
        var body = document.body,
            height = (window.outerHeight || document.body.offsetHeight) + 'px',
            sections = document.querySelectorAll('.page-section');
        body.style.paddingTop = height;
        if (sections.length) {
            var i = sections.length;
            while (i--) {
                sections[i].style.minHeight = height;
            }
        }
    };

    if (!Modernizr.cssvhunit) {
        vhUnits();
    }

})(window, document);