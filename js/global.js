(function(window, document, undefined) {
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
