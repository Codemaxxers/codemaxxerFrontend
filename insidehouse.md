---
layout: none
title: inside of the house
author: Vivian, Aliya
permalink: /insidehouse
---
<body>
<div>
    <button onclick="goHome()" id="homeBtn" class="homeBtn">Go Homepage</button>
    <div class="fight-container">
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
    
    * {
        font-family: "DotGothic16", sans-serif;
        box-sizing: border-box;
    }

    .homeBtn:hover {
        background-color: #ddd;
    }

    body {
        background-image: url("{{site.baseurl}}/images/indoorRoom.png");
    }

    .homeBtn{
        position: absolute;
        border:  3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
    }
</style>
