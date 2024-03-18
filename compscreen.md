---
layout: none
title: Computer Screen Close Up 
author: Emma
permalink: /compscreen
---

<body>

<div class="container"> 
    <h1>Become a Cyber Wizard!</h1>
    <button onclick="goBack()" id="backBtn" class="backBtn">Back</button>
    <div class="inside-container">
        <a id="gravityBtn" href="#"> <img class="gravityBtn" src="images/gravityicon.png"></a>
    </div>
    <div class="inside-container">
        <a id="phishingBtn" href="#"> <img class="phishingBtn" src="images/phishingicon.png"></a>
    </div>
    <div class="inside-container">
        <a id="passwordBtn" href="#"> <img class="passwordBtn" src="images/passwordicon.png"></a>
    </div>
</div>
<div class="modal" id="modal">
    <div class="modal-inner">
        <p> test </p>
        <button id="closeModal"> Close </button>
    </div>
</div>

</body>

<script>
    var backBtn = document.getElementById("back-btn");
    function goBack() {
        window.location.href = '{{site.baseurl}}/insidehouse';
    }

    const gravityBtn = document.getElementById('gravityBtn');
    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('modal');

    gravityBtn.addEventListener("click", () => {
        modal.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("open");
    });

  
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    
    * {
        font-family: "DotGothic16", sans-serif;
        box-sizing: border-box;
    }

    .container {
        height: 100%;
        width: 100%;
    }

    .backBtn:hover {
        background-color: #ddd;
    }

    .backBtn{
        border: 3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
        position: absolute; left: 20px; top: 20px;
    }

    body {
        background-image: url("{{site.baseurl}}/images/blankScreenWide.png");
        background-size: contain;
        background-repeat: no-repeat; 
        background-position: center; 
        margin: 0;
        padding: 0;
    }

    .modal {
        background-color: none;
        opacity: 0;
        position: fixed;
        top:0px;
        left: 9px;
        right: 0;
        bottom: 186px;
        transition: all 0.3s ease-in-out;
        z-index: -1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal.open {
        opacity: 1;
        z-index: 999;
    }

    .modal-inner {
        background-color: white;
        border-radius: 2px;
        padding: 40px 25px;
        text-align: center;
        width: 785px;
        height: 407px;
    }

    #popup-window {
        position: fixed;
        width: 70%;
        height: 50%;
        background: white;
        border: 1px solid black;
        padding: 10px;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: none;
    }  

    .gravityBtn {
        width: 550px;
        height: 500px;
        position: absolute; left: 300px; top: 120px; 
    }

    .phishingBtn {
        width: 200px;
        height: 200px;
        position: absolute; left: 720px; bottom: 300px; 
    }

    .passwordBtn {
        width: 200px;
        height: 200px;
        position: absolute; left: 950px; bottom: 300px; 
    }
    
    h1 {
        position: absolute; top: 100px; left: 30%;
        text-align: center;
        font-size: 60px;
    }
</style>

