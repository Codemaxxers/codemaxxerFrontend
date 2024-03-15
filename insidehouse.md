---
layout: none
title: inside of the house
author: Vivian, Aliya
permalink: /insidehouse
---
<body>
<div>
    <button onclick="goHome()" id="homeBtn" class="homeBtn">Go Homepage</button>
    <div class="inside-container">
        <a id="computerBtn" href="{{site.baseurl}}/game/compscreen.md"> <img class="computerBtn" src="images/homeComputer.png"></a>
    </div>
</div>
</body>

<script>
    var homeBtn = document.getElementById("home-btn");
    function goHome() {
        window.location.href = '{{site.baseurl}}/game/index.html';
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    body {
        background-image: url("{{site.baseurl}}/images/indoorRoom.png");
    }

    * {
        font-family: "DotGothic16", sans-serif;
        box-sizing: border-box;
    }

    .homeBtn:hover {
        background-color: #ddd;
    }

    body {
        background-image: url("{{site.baseurl}}/images/indoorRoom.png");
        background-size: contain;
        background-repeat: no-repeat; /* optional, to prevent image repetition */
        background-position: center; /* optional, to center the image */
        height: 100vh;
        margin-bottom: 30px;
        background-size: 925px;
    }

    .homeBtn{
        position: absolute;
        border:  3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
    }

    .homeBtn:hover {
        background-color: #ddd;
    }

    .computerBtn {
        width: 97px;
        height: 97px;
        left: 200px;
        position:absolute;
            top:23.8%;
            left:28%;
    }
</style>
