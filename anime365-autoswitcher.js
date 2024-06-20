// ==UserScript==
// @name         anime365-autoswitcher.js
// @namespace    http://tampermonkey.net/
// @version      2024-04-29
// @description  try to take over the world!
// @author       You
// @match        https://anime365.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anime365.ru
// @grant       GM_setValue
// @grant       GM_getValue
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function newEpisode() {
        var newepisode_button_array_container = $('#m-index-personal-episodes')
        GM_setValue("RUN", 'true')
        window.location.assign(newepisode_button_array_container[0].children[0].children[3].children[0].children[0].children[0].children[1].children[0].href)
}

function playVideo() {
    var video = document.getElementById('main-video')
    if (video === null) {
        setTimeout(playVideo, 500)
        if (GM_getValue("RUN") === 'goto') {
            GM_setValue("RUN", 'true')
            window.location.assign('https://anime365.ru/')
        }
        return
    }
    GM_setValue("RUN", 'false')
    video.play()
    //video.requestFullscreen()
    setTimeout(setSpeed, 1000)
}

function setSpeed() {
    if (GM_getValue("RUN") === 'true') {
        GM_setValue("RUN", 'false')
        return
    }
    var video = $('video')
    if (video.length === 0) {
        setTimeout(setSpeed, 500)
        return
    } else {
        video = video[0]
    }
    video.playbackRate = 2.0
    if (video.ended) {
        GM_setValue("RUN", 'goto')
    }
    setTimeout(setSpeed, 1000)
}

(function() {
    'use strict';
    var newepisode_button_array_container = $('#m-index-personal-episodes')
    if (window.location.href === 'https://anime365.ru/') {
        var btn = document.createElement("button")
        btn.innerHTML = "Play episodes"
        btn.onclick = newEpisode
        newepisode_button_array_container[0].children[0].children[1].after(btn);
        if (GM_getValue("RUN") === 'true' || GM_getValue("RUN") === 'goto') {
            GM_setValue("RUN", 'false')
            newEpisode()
        }
    } else {
        var btn = document.createElement("button")
        btn.innerHTML = "Endless"
        btn.onclick = ()=>{GM_setValue("RUN", 'true');window.location.reload()}
        var cont = $('.card')
        if (cont.length > 0) cont[0].remove()
        cont = $('.card-content')
        btn.className = "btn"
        if (cont.length > 0) cont[0].append(btn);
        if (GM_getValue("RUN") === 'true') {
            console.log('run')
            playVideo()
        }
    }
    // Your code here...
})();
