// ==UserScript==
// @name         Map Crunch tracker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.mapcrunch.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var i=0;
    cloneButton();

    map.streetView.addListener('position_changed', function() {
        var myrec = 'start';
        if ( i > 0 ) {
            myrec = i + '';
        }
        myrec += ",," + map.streetView.getPosition().lat() + "," + map.streetView.getPosition().lng() + "\n";
        localStorage["myPath"] = localStorage["myPath"] + myrec;
        console.log("got fired ",myrec);
        i++;
    })
    $("#stealth").prop('checked', true);
    $("#go-button").click(function() {
        localStorage["myPath"] = "name,desc,latitude,longitude\n";
        i=0;
    });

    function cloneButton() {
        var btn = $("#go-button");
        var btn2 = null;

        var btn_options = btn.button('option');

        btn2 = btn.clone().attr("id", "copyPath");
        btn2.click(function ()
        {
            var temp = $('<textarea/>');
            temp.text(localStorage["myPath"]);
            $('body').append(temp);
            temp.select();
            document.execCommand('copy', true);
            temp.remove();
        });
        btn2.text("Copy path");

        btn2.insertAfter(btn);

        //Need to re-constitue btn2 as a button.
        btn2.button(btn_options);
        btn2.attr("data-tip","Copy GPS data to clipboard");
        btn2.attr("title","Copy GPS data to clipboard");
    }

})();
