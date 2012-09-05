FullScreenBackground
====================

A jQuery plugin for displaying full screen backgrounds and transitioning between them.

Options
=======
        
    files - The images to display as fullscreen backgrounds
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
    
Usage
=====

Create a container DIV element on your page:

    <div id="fsbgContainer"></div>

Call .fullscreenbackground on it using jQuery:

    $("div#fsbgContainer").fullscreenbackground({
        files: [
                "/Content/images/background_001.jpg",
                "/Content/images/background_002.jpg",
                "/Content/images/background_003.jpg"
        ],
        interval: 10000,
        transitionTime: 1000
    });
