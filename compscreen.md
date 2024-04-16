---
layout: none
title: Computer Screen Close Up 
author: Emma
permalink: /compscreen
---

<body>

<div>
    <h1>Become a Cyber Wizard!</h1>
    <button onclick="goBack()" id="backBtn" class="backBtn">Back</button>
    <div class="inside-container">
        <a id="gravityBtn" href="{{site.baseurl}}/gravity"> <img class="gravityBtn" src="images/gravityicon.png"></a>
    </div>
    <div class="inside-container">
        <a id="phishingBtn" href="{{site.baseurl}}/phishing"> <img class="phishingBtn" src="images/phishingicon.png"></a>
    </div>
    <div class="inside-container">
        <a id="passwordBtn" href="{{site.baseurl}}/password"> <img class="passwordBtn" src="images/passwordicon.png"></a>
    </div>

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
        border: 3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
        position: relative; left: 20px; top: -100px;
    }

    body {
        background-image: url("{{site.baseurl}}/images/blankScreenWide.png");
        background-size: contain;
        background-repeat: no-repeat; 
        background-position: center; 
        height: 100vh;
        margin: 0;
        padding: 0;
    }

    .gravityBtn {
        width: 550px;
        height: 500px;
        position: relative; left: 300px; top: 50px; 
    }

    .phishingBtn {
        width: 200px;
        height: 200px;
        position: relative; left: 720px; bottom: 325px; 
    }

    .passwordBtn {
        width: 200px;
        height: 200px;
        position: relative; left: 950px; bottom: 520px; 
    }
    
    h1 {
        position: relative; top: 200px;
        text-align: center;
        font-size: 60px;
    }
</style>

