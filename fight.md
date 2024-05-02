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
        <div class="topRow">
            <div class="move" id="userName">name</div>
            <div class="move" id="level">Player Level</div>
        </div>
        <div class="bottomRow">
            <!-- <div class="move" id="damage">Damage</div> -->
            <div class="move" id="health">Health</div>
        </div>
    </div>
    <div class="health-box" style="margin-left: 65vw; margin-right: 10vw;margin-top: 25vh;">
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
        <div class="move" class="backgroundStyle" id="ChangeATK" onclick="attackMENU()">
            <h1>Attack</h1>
        </div>
        <div class="move" class="backgroundStyle" id="ChangePT" onclick="potionMENU()">
            <h1>Potions</h1>
        </div>
        <div class="move" class="backgroundStyle" id="ChangeInv" onclick="inventoryMENU()">
            <h1>Inventory</h1>
        </div>
        <div class="move" class="backgroundStyle" id="run" onclick="Leave()">
            <h1>Run Away</h1>
        </div>
    </div>
</div>

<div class="scroll" id="weaponMenu" style="display: none;">
    <div id="profile-container">
        <img id="playerImage" src="game/img/player.png">
        <br>
        <div id="playerStats">
            <h1 class="centered">Player Stats</h1><hr/>
            <h1 id="characterHealth"></h1>
            <h1 id="characterDamage"></h1>
            <br>
            <h1>Equipped Gear</h1>
            <div id="equipped" class="flex-container">
            </div>
        </div>
        <div id="inventory">
        <div class="inventoryArmor">
            <h1>Armor</h1>
        </div>
        <br>
        <div class="inventoryWeapons">
            <h1>Weapons</h1>
        </div>
        <br>
        <!-- 
        <div class="inventoryAccessories">
            <h1>Accessories</h1>
        </div> -->
        <div id="equip-spot" ondrop="drop(event)" ondragover="allowDrop(event)">Drop Here to Equip</div>
    </div>
    </div>
</div>


<script src="{{site.baseurl}}/assets/js/fight.js"></script>

<script src="{{site.baseurl}}/assets/js/character.js"></script>

<style>
#profile-container {
    position: absolute;
    right: 43vw;
    top: 10%;
    width: 350px;
    padding: 40px;
    background-color: #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: black;
    font-family: "DotGothic16", sans-serif;
    z-index: 99;
}

.controller {
    bottom: 100px;
    position: absolute;
    left: 10px;
}

#level {
    background-color: #71b9e2;
}

.health-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35vh;
    width: 15vw;
}

.topRow, .bottomRow {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

#userName {
    font-size: 1.2em;
}
</style>
