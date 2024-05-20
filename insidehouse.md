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
        <a id="computerBtn" href="{{site.baseurl}}/compscreen"> <img class="computerBtn" src="images/homeComputer.png"></a>
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
        /*background-image: url("{{site.baseurl}}/images/indoorRoom.png");*/
        background-image: url("https://raw.githubusercontent.com/Codemaxxers/codemaxxerFrontend/main/game/img/pb2.jpeg");
        background-repeat: repeat;
        background-size: auto;
        background-position: center; /* optional, to center the image */
        height: 25vh;
        margin-bottom: 30px;
        background-size: 300px;
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
        /* left: 200px; */
        position:absolute;
            top: 23.8%;
            left: 28%;
    }


</style>
