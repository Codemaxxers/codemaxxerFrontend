---
toc: true
comments: true
layout: star
title: fight everything
author: Finn C
permalink: /fight
---
<style>
    .fight-container {
        display: flex;
        justify-content: space-around;
        align-items: flex-start; /* Align items to the top */
        margin-top: 50px;
    }

    .player-box,
    .enemy-box {
        width: 200px; /* Increased width */
        height: 200px; /* Increased height */
        border-radius: 8px;
        overflow: hidden;
        position: relative; /* Add position relative to allow absolute positioning */
    }

    .player-box img,
    .enemy-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .controller {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #f7f7f7;
        padding: 10px;
        border-radius: 8px;
        margin-top: 15px;
        margin-left: 100px;
        margin-right: 100px;
        transform: translateY(40vh); /* Move the player image down */
    }

    .move {
        background-color: #e0e0e0;
        color: #333;
        text-align: center;
        padding: 10px;
        border-radius: 8px;
        width: 150px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .move:hover {
        background-color: #ccc;
    }

    h1 {
        margin: 0;
        font-size: 1.2em;
    }

    .player-box {
        margin-bottom: 50px; /* Add margin to push it down */
        transform: translateY(40vh); /* Move the player image down */
    }

    .enemy-box {
        order: 2; /* Order the enemy box to appear second */
        transform: scale(0.75); /* Make the enemy image a bit smaller */
    }

    p {
        margin: 5px 0 0;
        font-size: 0.9em;
    }

    b {
        color: #ff6347;
    }

    #response-box {
        color: white;
    }

    /* Shadow/platform effect */
    .player-box::after,
    .enemy-box::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        z-index: -1;
        box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.5);
    }

    .health-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #f7f7f7;
        padding: 10px;
        border-radius: 8px;
        margin-top: 15px;
        margin-left: 100px;
        margin-right: 75vw;
    }
</style>

<div id="response-box">
</div>

<div class="health-box">
    <div class="move" id="health">Player: 100</div>
    <div class="move" id="health">Enemy: </div>
</div>

<div class="fight-container">
    <div class="player-box">
        <img src="{{site.baseurl}}/images/player.png">
    </div>
    <div class="enemy-box">
        <img src="{{site.baseurl}}/images/enemy.png">
    </div>
</div>

<div class="controller">
    <div class="move" id="move1">
        <h1>Scratch</h1>
        <p><b>50 Damage</b> scratch your opponent</p>
    </div>
    <div class="move"></div>
    <div class="move"></div>
    <div class="move" id="run">
        <h1>Run Away</h1>
        <p>leave the battle</p>
    </div>
</div>

<script>
    document.getElementById("move1").addEventListener("click", Question);
    document.getElementById("run").addEventListener("click", Leave);
    let StartingHealth = 100;
    let health = 100;


    function Question() {
        var responseBox = document.getElementById("response-box");
        let question = "What kind of code looks like 0010110101110";
        let answer = "binary";

        let response = prompt(question.toLowerCase());
        if (response == answer) {
            responseBox.innerHTML = "You Win";
        } else {
            responseBox.innerHTML = "You Lose";
        }
    }

    function Leave() {
        if (health < StartingHealth / 2 ) {
            alert("Running Away Failed");
        }
    }
</script>