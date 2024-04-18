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

<!-- gravity game modal -->
<div class="g-modal" id="g-modal">
    <div class="modal-inner">
        <link rel="stylesheet" href="gravity_game/gravitystyle.css">
        <body>
            <button class ="closeGBtn" id="closeGModal"> Close </button>
            <canvas id="gameCanvas" width="1200" height="800"></canvas>
            <div id="typingBar">
                <input type="text" id="userInput" placeholder="Type the definition">
                <div id="inputHistory"></div>
            </div>
            <script src="gravity_game/gravityscript.js"></script>
        </body>
    </div>
</div>

<!-- phishing game modal -->
<div class="phish-modal" id="phish-modal">
    <div class="modal-inner">
        <link rel="stylesheet" href="phishing_game/phishingstyle.css">
        <button class ="closePhishBtn" id="closePhishModal"> Close </button>
    </div>
</div>

<!-- password game modal -->
<div class="pass-modal" id="pass-modal">
    <div class="modal-inner">
        <link rel="stylesheet" href="password_game/passwordstyle.css">
        <body>
            <script src="password_game/passwordscript.js"></script>
            <div class="container">
                <h2>Password Game</h2>
                <br>
                <button id="start_button" class="select_button" onclick="startGame()">Start</button>
                <div id="play_container" class="play_container" style="display:none">
                    <input type="text" id="passwordInput" placeholder="Enter your password">
                    <br><br>
                    <button id="check_button" class="check_button" onclick="checkPassword()">Check</button>
                    <ul id="requirements">
                        <br>
                        <li id="length">At least 8 characters</li>
                        <li id="uppercase" style="display:none;">At least one uppercase letter</li>
                        <li id="lowercase" style="display:none;">At least one lowercase letter</li>
                        <li id="numbers" style="display:none;">At least one number</li>
                        <li id="specialChars" style="display:none;">At least one special character</li>
                    </ul>
                    <div id="timerDisplay" style="font-size: 24px; margin: 20px;">0:00</div>
                    <button id="restart_button" class="restart_button" onclick="restartGame()" style="display:none;">Restart</button>
                </div>
            </div>
            <div id="resultModal" class="modal">
                <div class="modal-content">
                    <span class="close-button" onclick="closeModal()">&times;</span>
                    <h3>You met all the requirements, your password's:</h3>
                    <p id="strengthResult">-</p>
                    <p id="crackTimeResult">-</p>
                </div>
            </div>
        </body>
        <button class ="closePassBtn" id="closePassModal"> Close </button>
    </div>
</div>
</body>

<script>
    var backBtn = document.getElementById("back-btn");
    function goBack() {
        window.location.href = '{{site.baseurl}}/insidehouse';
    }

    const gravityBtn = document.getElementById('gravityBtn');
    const phishingBtn = document.getElementById('phishingBtn');
    const passwordBtn = document.getElementById('passwordBtn');

    const closeGBtn = document.getElementById('closeGModal');
    const gmodal = document.getElementById('g-modal');

    const closePhishBtn = document.getElementById('closePhishModal');
    const phishmodal = document.getElementById('phish-modal');

    const closePassBtn = document.getElementById('closePassModal');
    const passmodal = document.getElementById('pass-modal');

    //gravity popup
    gravityBtn.addEventListener("click", () => {
        gmodal.classList.add("open");
    });

    closeGBtn.addEventListener("click", () => {
        gmodal.classList.remove("open");
    });

    //phishing game popup
    phishingBtn.addEventListener("click", () => {
        phishmodal.classList.add("open");
    });

    closePhishBtn.addEventListener("click", () => {
        phishmodal.classList.remove("open");
    });

    //password game popup
    passwordBtn.addEventListener("click", () => {
        passmodal.classList.add("open");
    });

    closePassBtn.addEventListener("click", () => {
        passmodal.classList.remove("open");
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

    .g-modal, .pass-modal, .phish-modal {
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

    .g-modal.open {
        opacity: 1;
        z-index: 999;
    }

    .pass-modal.open {
        opacity: 1;
        z-index: 999;
    }

    .phish-modal.open {
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

    .closeGBtn, .closePassBtn, .closePhishBtn{
        position: absolute;
            top: 100px;
            left: 70%;
    }
</style>

