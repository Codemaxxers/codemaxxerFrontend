---
toc: true
comments: true
layout: battle
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

<style>
    .banner {
        background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0, 0, 0, 0.5)),url(images/grassy_background.png);
        background-size: cover;
        background-position: center;
    }
</style>

<div>
    <div class="health-box">
        <div class="move" id="health">Player: 100</div>
        <div class="move" id="EnemyHealth">Enemy: </div>
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
            <p><b>5 Damage</b> scratch your opponent</p>
        </div>
        <div class="move"></div>
        <div class="move"></div>
        <div class="move" id="run">
            <h1>Run Away</h1>
            <p>leave the battle</p>
        </div>
    </div>
</div>

<script>
    // Define a global array to store enemy IDs
    let enemyIds = [];

    // Call the function to fetch enemies when the script is loaded
    GetEnemy();

    // Add event listeners to the buttons
    document.getElementById("move1").addEventListener("click", Question);
    document.getElementById("run").addEventListener("click", Leave);

    // Define global variables
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
        if (health < StartingHealth / 2) {
            alert("Running Away Failed");
        }
    }

    function GetLevel(points) {
        let l = 1;
        while (true) {
            if (points - (l + 5) > 0) {
                points -= 5;
                l += 1;
                console.log(l);
            } else {
                break;
            }
        }
        return l; // Return the level value
    }

    function GetEnemy() {
        // Fetch the Users Account Points First
        // Hard Coded Value for now
        var userLevel = GetLevel(100); // Assuming 25 points are retrieved for the user

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',  // Include this line for cross-origin requests with credentials
            redirect: 'follow'
        };

        var api = "http://localhost:8032/api/enemies"
        fetch(api, requestOptions)
        .then(response => response.json()) // Convert response to JSON format
        .then(result => {
            console.log(result); // Log the result for debugging purposes

            // Filter enemies based on user's level or lower
            let filteredEnemies = result.filter(enemy => parseInt(enemy.level) <= parseInt(userLevel));

            if (filteredEnemies.length > 0) {
                // Loop through filtered enemies to populate enemyIds array and update enemy health
                filteredEnemies.forEach(enemy => {
                    enemyIds.push(enemy.id); // Add enemy ID to the array
                });

                // Get a random enemy ID from the enemyIds array
                let randomEnemyId = enemyIds[Math.floor(Math.random() * enemyIds.length)];
                console.log("Random Enemy ID:", randomEnemyId);
            } else {
                console.log("No enemies found at or below user's level.");
            }
        })
        .catch(error => console.log('error', error));
    }
</script>