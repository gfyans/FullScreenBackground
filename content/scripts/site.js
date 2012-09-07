(function ($) {
    $("div#fsbgContainer").fullscreenbackground({
        files: [
                "content/images/background_001.jpg",
                "content/images/background_002.jpg",
                "content/images/background_003.jpg"
        ],
        interval: 10000,
        transitionTime: 1000,
        useScanlines: true,
        scanlineGraphic: "content/images/diagonal_pattern_bw.png"
    });
}(jQuery));