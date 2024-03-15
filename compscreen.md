---
layout: none
title: Computer Screen Close Up 
author: Emma
permalink: /compscreen
---

<body>

<div>
    <button onclick="goBack()" id="backBtn" class="backBtn">Back</button>
    <div class="fight-container"></div>

</div>

</body>

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
        background-image: url("{{site.baseurl}}/images/blankScreen.png");
        background-size: contain;
        background-repeat: no-repeat; /* optional, to prevent image repetition */
        background-position: center; /* optional, to center the image */
        height: 100vh;
        margin: 0;
        padding: 0;
    }
</style>

