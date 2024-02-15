---
toc: true
comments: true
layout: battle
title: fight everything
author: Finn C
permalink: /fight
---
<style>
    .fade-in {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .fade-in.visible {
        opacity: 1;
    }

    @keyframes flash {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }

    .flashing {
        animation: flash 0.5s infinite alternate; /* Use alternate to switch back and forth */
    }
    .question-box {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 350px;
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
    }

    .question-box h2 {
        margin-top: 0;
        color: #333;
    }

    #answers div {
        margin-top: 10px;
        padding: 5px;
        background-color: #ddd;
        border-radius: 5px;
        cursor: pointer;
    }

    #answers div:hover {
        background-color: #ccc;
    }
</style>

<div>
    <div class="alert" id="alert" style="display: none;">
        <div id="home-btn" class="move">
            Go back to homepage
        </div>
    </div>
    <div class="health-box">
        <div class="move" id="level">Player Level: </div>
        <div class="move" id="health">Player: 10</div>
        <div class="move" id="EnemyHealth">Enemy: </div>
    </div>
    <div class="fight-container">
        <div class="player-box">
            <img id="pIMG" class="" src="{{site.baseurl}}/images/player.png">
        </div>
        <div class="enemy-box">
            <img id="eIMG" class="fade-in" src="{{site.baseurl}}/images/">
        </div>
    </div>
    <div class="question-box">
        <h2>Attack</h2>
        <p id="question-text">Select an Attack</p>
        <div id="answers">
            <!-- Dynamically filled answers will go here -->
        </div>
    </div>
    <div id="moves" class="controller">
        <div class="moveATK" id="move1">
            <h1>Scratch</h1>
            <p><b>5 Damage</b> scratch your opponent</p>
        </div>
        <div class="moveATK" id="move2">
            <h1>Thunderbolt</h1>
            <p><b>15 Damage</b> rain lighting down on your opponent</p>
        </div>
        <div class="moveATK" id="move3">
            <h1>Fireball</h1>
            <p><b>25 Damage</b> Set ablaze to your opponent</p>
        </div>
        <div class="moveATK" id="move4">
            <h1>Tidal Wave</h1>
            <p><b>40 Damage</b> A wall of water sure to drown your opponent</p>
        </div>
        <div class="move" id="run">
            <h1>Run Away</h1>
            <p>leave the battle</p>
        </div>
    </div>
</div>

<script>
    // Define a global array to store enemy IDs
    let enemyIds = [];
    //Enemy Values
    var updateHealthEnemy = document.getElementById("EnemyHealth");
    var updateHealth = document.getElementById("health");
    var levelUpdate = document.getElementById("level");
    var enemyIMG = document.getElementById("eIMG");
    var playerIMG = document.getElementById("pIMG");
    var controller = document.getElementById("moves");
    var alert = document.getElementById("alert");
    var alertBox = document.getElementById("home-btn");
    
    var eHealth = 40;
    var eAttack = 0;
    var eDefense = 0;
    var eName = "";
    let userLevel = 1;

    // Add event listeners to the buttons
    document.getElementById("alert").addEventListener("click", function() {
        window.location.href = "{{site.baseurl}}/game/index.html";
    });
    document.getElementById("run").addEventListener("click", Leave);

    // Define global variables
    let StartingHealth = 10;
    let health = 10;

    let course = "csp";
    console.log(course)

    // Call the function to fetch enemies when the script is loaded
    GetLevel();
    GetEnemy();

    function fetchQuestion(attackValue) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        };
        
        var api = `https://codemaxxers.stu.nighthawkcodingsociety.com/api/questions/random/${course}`;
        fetch(api, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result); // For debugging
            // Update the question text
            document.getElementById("question-text").innerText = result.question;

            // Clear previous answers
            const answersDiv = document.getElementById("answers");
            answersDiv.innerHTML = "";

            // Dynamically create answer buttons or text for each possible answer
            for (let i = 1; i <= 4; i++) {
                let answerDiv = document.createElement("div");
                answerDiv.innerText = result[`answer${i}`];
                answerDiv.onclick = function() { checkAnswer(i, result.correctAnswer, attackValue); };
                answersDiv.appendChild(answerDiv);
            }
        })
        .catch(error => console.log('error', error));
    }

    function checkAnswer(selectedAnswer, correctAnswer, attackValue) {
        if (selectedAnswer === correctAnswer) {
            console.log("Correct! You attack the enemy.");
            eHealth -= attackValue;
            updateHealthEnemy.innerHTML = `Enemy: ${eHealth}`;
            // When an image gets hurt, you can add the flashing class to it
            enemyIMG.classList.add('flashing');

            // After a certain duration, remove the flashing class to stop the flashing effect
            setTimeout(function() {
                enemyIMG.classList.remove('flashing');
            }, 2000);
            fetchQuestion(attackValue); // Fetch a new question for the next attack
        } else {
            console.log("Incorrect. The enemy attacks you!");
            health -= eAttack;
            updateHealth.innerHTML = `Player: ${health}`;
            // When an image gets hurt, you can add the flashing class to it
            playerIMG.classList.add('flashing');

            // After a certain duration, remove the flashing class to stop the flashing effect
            setTimeout(function() {
                playerIMG.classList.remove('flashing');
            }, 2000);
            fetchQuestion(attackValue); // Fetch a new question for the next attack
        }

        // Call Battle to check for end-of-battle scenarios
        Battle(attackValue);
    }

    function Leave() {
        if (health < StartingHealth / 2) {
            alert("Running Away Failed");
        }
    }

    function GetEnemy() {
        // Fetch the Users Account Points First
        // Hard Coded Value for now
        console.log(userLevel);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',  // Include this line for cross-origin requests with credentials
            redirect: 'follow'
        };

        var api = "https://codemaxxers.stu.nighthawkcodingsociety.com/api/enemies"
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
                let randomEnemyIndex = Math.floor(Math.random() * filteredEnemies.length);

                // Get the random enemy object
                let randomEnemy = filteredEnemies[randomEnemyIndex];

                // Updating Values depending on the fetched enemy
                eHealth = randomEnemy.health;
                eAttack = randomEnemy.attack;
                eDefense = randomEnemy.defense;
                eName = randomEnemy.name;

                //Update Img
                enemyIMG.src = enemyIMG.src + `${eName}.png`
                setTimeout(function() {
                    enemyIMG.classList.add('visible');
                }, 100);

                updateHealthEnemy.innerHTML = `Enemy: ${eHealth}`;

            } else {
                console.log("No enemies found at or below user's level.");
            }
        })
        .catch(error => console.log('error', error));
    }

    function Battle(attack) {
        fetchQuestion(attack); // Call fetchQuestion with the attack value
        // Check if the player or enemy has been defeated
        if (health <= 0) {
            alert.style = "";
            alertBox.innerHTML = "<b>You Lost</b><p>Go back to homepage</p>";
        } else if (eHealth < 1) {
            updateHealthEnemy.innerHTML = `Enemy: Defeated`;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow',
                credentials: 'include'
            };
            //Adding points to the account
            fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/addPointsCSA?points=75", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            //Re-direct to island
            alert.style = "";
            alertBox.innerHTML = "<b>You Won</b><p>Go back to homepage</p>";
            return;
        }
    }

    function GetLevel() {
    var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
    };

    fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/jwt", requestOptions)
    //fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/jwt", requestOptions)
        .then(response => {
                if (!response.ok) {
                    const errorMsg = 'Login error: ' + response.status;
                    console.log(errorMsg);

                    switch (response.status) {
                        case 401:
                            alert("Please log into or make an account");
                            // window.location.href = "login";
                            break;
                        case 403:
                            alert("Access forbidden. You do not have permission to access this resource.");
                            break;
                        case 404:
                            alert("User not found. Please check your credentials.");
                            break;
                        // Add more cases for other status codes as needed
                        default:
                            alert("Login failed. Please try again later.");
                    }

                    return Promise.reject('Login failed');
                }
                return response.json();
                // Success!!!
            })
        .then(data => {
            userLevel = data.accountLevel; // Set the innerHTML to just the numeric value
            //Changing color of move to show you can use it
            document.getElementById("move1").style = "background-color: #e0e0e0;";
            document.getElementById("move1").addEventListener("click", function() {
                Battle(5);
            });
            if (userLevel >= 2) {
                document.getElementById("move2").style = "background-color: #e0e0e0;";
                document.getElementById("move2").addEventListener("click", function() {
                    Battle(15);
                });
            }
            if (userLevel >= 5) {
                document.getElementById("move3").style = "background-color: #e0e0e0;";
                document.getElementById("move3").addEventListener("click", function() {
                    Battle(25);
                });
            }
            if (userLevel >= 10) {
                document.getElementById("move4").style = "background-color: #e0e0e0;";
                document.getElementById("move4").addEventListener("click", function() {
                    Battle(45);
                });
            }
            console.log(data.accountLevel);
            console.log(userLevel);
            levelUpdate.innerHTML = "Player Level:" + userLevel;
            return userLevel;
        })
        .catch(error => console.log('error', error));
    }
</script>