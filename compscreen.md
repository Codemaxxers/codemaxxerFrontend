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

<script>
    var backBtn = document.getElementById("back-btn");
    function goBack() {
        window.location.href = '{{site.baseurl}}/insidehouse';
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    
    * {
        font-family: "DotGothic16", sans-serif;
        box-sizing: border-box;
    }

    .backBtn:hover {
        background-color: #ddd;
    }

    .backBtn{
        position: absolute;
        border:  3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
        margin-left: 10px;
        margin-top: 10px;
    }

    body {
        background-image: url("{{site.baseurl}}/images/blankScreenWide.png");
        background-size: contain;
        background-repeat: no-repeat; /* optional, to prevent image repetition */
        background-position: center; /* optional, to center the image */
        height: 100vh;
        margin: 0;
        padding: 0;
    }
</style>

