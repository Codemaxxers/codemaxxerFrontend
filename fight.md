---
toc: true
comments: true
layout: default
title: fight everything
author: Finn C
permalink: /fight
---

<style>
    .fight-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 50px;
    }

    .player-box,
    .enemy-box {
        width: 150px;
        height: 150px;
        border: 2px solid #333;
        border-radius: 8px;
        overflow: hidden;
    }

    .player-box img,
    .enemy-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .controller {
        display: flex;
        justify-content: space-between; 
        align-items: center;
        background-color: #f7f7f7; 
        padding: 10px; 
        border-radius: 8px;
        margin-top: 15px;
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
</style>

<div id="response-box">
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
    <div class="move">
    </div>
    <div class="move">
    </div>
    <div class="move">
    </div>
</div>

<script>
    document.getElementById("move1").addEventListener("click", Question);

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
</script>