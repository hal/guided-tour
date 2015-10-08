window.onkeydown = function(e) {
    if (e.keyCode === 27 && parent.closeGuidedTour) {
        parent.closeGuidedTour();
    }
};
