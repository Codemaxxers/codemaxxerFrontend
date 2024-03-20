---
toc: true
comments: true
layout: battle
title: fight everything
author: Finn C
permalink: /fight
---


<div>
    <div class="alert" id="alert" style="display: none;">
        <div id="home-btn" class="move">
            Go back to homepage
        </div>
    </div>
    <div class="health-box">
        <div class="move" id="level">Player Level: </div>
        <div class="move" id="health">Player: 10</div>
        <div class="move" id="defense">Defense: 10</div>
    </div>
    <div class="health-box" style="margin-left: 75vw; margin-right: 50px;">
        <div class="move" id="EnemyName">Enemy: </div>
        <div class="move" id="EnemyHealth">Enemy Health: </div>
    </div>
    <div class="fight-container">
        <div class="player-box">
            <img id="pIMG" class="" src="{{site.baseurl}}/images/player.png">
        </div>
        <div class="enemy-box">
            <img id="eIMG" class="fade-in" src="{{site.baseurl}}/images/">
        </div>
    </div>
    <div class="question-box" id="question-box" style="display: none;">
        <h1>Attack</h1>
        <p id="question-text">Select an Attack</p>
        <div id="answers">
            <!-- Dynamically filled answers will go here -->
        </div>
    </div>
    <div id="moves" class="controller">
        <div class="move" id="ChangeATK" onclick="attackMENU()">
            <h1>Attack</h1>
        </div>
        <div class="move" id="ChangePT" onclick="potionMENU()">
            <h1>Potions</h1>
        </div>
        <div class="move" id="ChangeInv" onclick="inventoryMENU()">
            <h1>Inventory</h1>
        </div>
        <div class="move" id="run" onclick="Leave()">
            <h1>Run Away</h1>
        </div>
    </div>
</div>

<script src="{{site.baseurl}}/assets/js/fight.js"></script>