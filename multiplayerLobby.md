---
toc: true
comments: true
layout: multiplayer
title: Fight!
author: Theo H
---

<script src="uri.js"></script>
<script src="connectionURI.js"></script>

<div>
    <div class="alert" id="alert" style="display: none;">
        <div id="home-btn" class="move">
            Go back to homepage
        </div>
    </div>
    <div class="health-box">
        <div class="topRow">
            <div class="move" id="playerName">NAME</div>
            <div class="move" id="playerLevel">LEVEL</div>
        </div>
        <div class="bottomRow">
            <!-- <div class="move" id="damage">Damage</div> -->
            <div class="move" id="playerHealth">HEALTH</div>
        </div>
    </div>
    <div class="health-box" style="margin-left: 65vw; margin-right: 10vw;margin-top: 25vh;">
        <div class="move" id="opponentName">Enemy: </div>
        <div class="move" id="opponentHealth">Enemy Health: </div>
    </div>
    <div class="fight-container">
        <div class="player-box" id="p1">
            <img id="pIMG" class="" src="{{site.baseurl}}/images/player.png">
        </div>
        <div class="enemy-box" id="p2" style="width: 150px">
            <img id="pIMG" class="" src="{{site.baseurl}}/images/opponent.png">
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
        <div id="attack" class="backgroundStyle" id="ChangeATK" onclick="attackMENU()">
            <h1>Attack</h1>
        </div>
    </div>
</div>

<div class="scroll" id="weaponMenu" style="display: none;">
    <div id="profile-container">
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

<script>
    window.addEventListener('onload', characterData());

    // function leave() {
    //     window.location.href = "/codemaxxerFrontend/game/index.html";
    // }

    window.addEventListener('onload', characterData());

    function characterData() {
        fetch(uri + "/api/person/characterData", {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("playerName").innerHTML = data.name;
            document.getElementById("playerLevel").innerHTML = "Level: " + data.accountLevel;

            // Match the player in the game info request with the name
            updateGameInfo(data.name);
        })
        .catch((error) => console.error(error));
    }

    function updateGameInfo(playerName) {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let lobbyId = localStorage.getItem("lobbyId");

        fetch(connectionuri + `/api/lobby/lobbyInfo?lobbyId=${lobbyId}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Find and display the matching player's information
            if (data.players && data.players[playerName]) {
                const playerInfo = data.players[playerName];
                document.getElementById("playerName").innerHTML = playerInfo.name;
                document.getElementById("playerHealth").innerHTML = "Health: " + playerInfo.health;
            } else {
                console.log("Player not found in game info.");
            }

            let opponentData = null;
            for (const player in data.players) {
                if (player !== playerName) {
                    opponentData = data.players[player];
                    break;
                }
            }

            // Display the opponent's data if found
            if (opponentData) {
                document.getElementById("opponentName").innerHTML = "Enemy: " + opponentData.name;
                document.getElementById("opponentHealth").innerHTML = "Enemy Health: " + opponentData.health;
            } else {
                console.log("Opponent not found in game info.");
            }
        })
        .catch((error) => console.error(error));
    }


    function removeLobby() {
        const lobbyId = localStorage.getItem('lobbyId');

        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(connectionuri + `/api/lobby/removeLobby?lobbyId=${lobbyId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        localStorage.removeItem('lobbyId');
    }

// window.addEventListener('beforeunload', function(event) {
//         removeLobby();
//     }
// );


</script>

<style>
#attack {
    width: 100%;
}
#profile-container {
    position: absolute;
    right: 43vw;
    top: 10%;
    width: 550px;
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
