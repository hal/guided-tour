window.onkeydown = function (e) {
    if (e.keyCode === 27 && parent.closeGuidedTour) {
        parent.closeGuidedTour();
    }
};

i18n.init(
    {
        fallbackLng: 'en',
        ns: {
            namespaces: ['hal', 'standalone', 'domain'],
            defaultNs: 'hal'
        },
        resGetPath: '../locales/__lng__/__ns__.json'
    },
    function () {
        $('.eap-quick-tour').i18n();
    }
);
