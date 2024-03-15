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
    * {
        font-family: 'Press Start 2P', cursive;
        box-sizing: border-box;
    }

    button {
        border: 0;
        cursor: pointer;
        font-size: 16px;
      }
      
    button:hover {
        background-color: #ddd;
    }

    body {
        background-image: url("{{site.baseurl}}/images/indoorRoom.png");
    }

    .battle{
        position: absolute;
        top: 600px;
        left: 100px;
        border:  10px solid black;
    }
</style>
