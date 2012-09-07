/// <reference path="_references.js" />
/*jslint browser: true*/
/*global $, jQuery, window, document, setInterval*/
(function ($) {
    "use strict";
    $.fn.fullscreenbackground = function (opt) {

        /* 
        OPTIONS
        
        files - The images to display
        -------------------------------------------------------------------
        Type:     Array (string)
        Required: True
        
        interval - The time, in milliseconds, between image transitions
        -------------------------------------------------------------------
        Type:     int
        Required: False

        transitionTime - The time, in milliseconds, to complete the transition
        -------------------------------------------------------------------
        Type:     int
        Required: False
        
        */

        var fsbgContainer$ = this,
            options = {
                files: opt.files,
                interval: opt.interval || 5000,
                transitionTime: opt.transitionTime || 600,
                useScanlines: opt.useScanlines || false,
                scanlineGraphic: opt.scanlineGraphic || ""
            },
            nextPosition = 0, // Hold our current position when iterating options.files
            previousPosition, // Hold the previous position when iterating options.files
            firstRun = true,
            newImage$,

            resizeBackground = function () {
                var imageWidth = newImage$.width(),
                    imageHeight = newImage$.height(),
                    containerWidth = fsbgContainer$.width(),
                    containerHeight = fsbgContainer$.height(),
                    imageRatio = imageWidth / imageHeight,
                    containerRatio = containerWidth / containerHeight;

                if (imageRatio <= containerRatio) {
                    newImage$.css({ width: containerWidth + "px", height: "auto" });

                    // offset the top to make it appear centered
                    if (newImage$.height() > containerHeight) {
                        newImage$.css({ top: "-" + ((imageHeight - containerHeight) / 2) + "px" });
                    }
                } else {
                    newImage$.css({ height: containerHeight + "px", width: "auto" });

                    // offset the left to make it appear centered
                    if (newImage$.width() > containerWidth) {
                        newImage$.css({ left: "-" + ((imageWidth - containerWidth) / 2) + "px" });
                    }
                }
            },

            queueImage = function () {
                // Get the nextPosition image
                var file = options.files[nextPosition],
                    imageIdPrefix = "fsbg_image_",
                    newImgContainerId = (imageIdPrefix + nextPosition);

                newImage$ = $("<img />");
                newImage$.attr("src", file);
                newImage$.attr("id", newImgContainerId);
                newImage$.css({
                    "display": "none",
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px"
                });

                fsbgContainer$.find("img").addClass("-fsb-delete-me");

                fsbgContainer$.append(newImage$);

                // We only want to transition in the new image if it's been fully loaded
                newImage$.one("load", function () {
                    resizeBackground();

                    // Transition in the new one
                    newImage$.fadeIn(options.transitionTime, function () {
                        if (firstRun === true) {
                            firstRun = false;
                        } else {
                            fsbgContainer$.find(".-fsb-delete-me").remove();
                        }
                    });
                });

            },

            incrementAndQueueImage = function () {
                previousPosition = nextPosition;

                // If nextPosition is equal to the number of images, set to 0
                if (!firstRun) {
                    if (nextPosition === options.files.length - 1) {
                        nextPosition = 0;
                    } else {
                        nextPosition += 1;
                    }
                }

                queueImage();
            },

            scanlineInit = function () {
                var scanlineContainer$ = $("<div class=\"-fsb-scanlines\" />");
                scanlineContainer$.css({
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    "z-index": -99999,
                    top: 0,
                    left: 0,
                    "background-image": "url('" + options.scanlineGraphic + "')"
                });

                scanlineContainer$.insertAfter(fsbgContainer$);
            },

            backgroundInit = function () {
                // Set properties of container DIV
                fsbgContainer$.css({
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    "z-index": -99999,
                    top: 0,
                    left: 0
                });

                if (options.files.length === 1) {
                    queueImage();
                } else {
                    incrementAndQueueImage();

                    setInterval(incrementAndQueueImage, options.interval);
                }

                // Bind the window resize
                $(window).resize(function () {
                    resizeBackground();
                });
            },

            init = function () {
                backgroundInit();

                if (options.useScanlines) {
                    scanlineInit();
                }
            };

        init();

    };
}(jQuery));