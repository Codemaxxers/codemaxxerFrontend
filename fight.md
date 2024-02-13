---
toc: true
comments: true
layout: battle
title: fight everything
author: Finn C
permalink: /fight
---

<div>
    <div class="health-box">
        <div class="move" id="level">Player Level: </div>
        <div class="move" id="health">Player: 10</div>
        <div class="move" id="EnemyHealth">Enemy: </div>
    </div>
    <div class="fight-container">
        <div class="player-box">
            <img src="{{site.baseurl}}/images/player.png">
        </div>
        <div class="enemy-box">
            <img id="eIMG" src="{{site.baseurl}}/images/">
        </div>
    </div>
    <div class="controller">
        <div class="move" id="move1">
            <h1>Scratch</h1>
            <p><b>5 Damage</b> scratch your opponent</p>
        </div>
        <div class="move" id="move2">
            <h1>Thunderbolt</h1>
            <p><b>15 Damage</b> rain lighting down on your opponent</p>
        </div>
        <div class="move" id="move3">
            <h1>Fireball</h1>
            <p><b>25 Damage</b> Set ablaze to your opponent</p>
        </div>
        <div class="move" id="move4">
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
    const questions = {
        question1: "Is JavaScript a statically typed language?", answer1: "n", question2: "Does HTML stand for Hyper Text Markup Language?", answer2: "y", question3: "Is Python a compiled language?", answer3: "n", question4: "Does CSS stand for Cascading Style Sheets?", answer4: "y", question5: "Is Java primarily used for front-end web development?", answer5: "n", question6: "Is PHP a server-side scripting language?", answer6: "y", question7: "Is SQL a programming language?", answer7: "n", question8: "Is Ruby on Rails a programming language?", answer8: "n", question9: "Is C++ an object-oriented programming language?", answer9: "y", question10: "Is TypeScript a superset of JavaScript?", answer10: "y",
    };
    //Enemy Values
    var updateHealthEnemy = document.getElementById("EnemyHealth");
    var updateHealth = document.getElementById("health");
    var levelUpdate = document.getElementById("level");
    var enemyIMG = document.getElementById("eIMG");
    var eHealth = 0;
    var eAttack = 0;
    var eDefense = 0;
    var eName = "";
    let userLevel = 1;

    // Add event listeners to the buttons
    document.getElementById("move1").addEventListener("click", function() {
        Battle(5);
    });
    document.getElementById("move2").addEventListener("click", function() {
        Battle(15);
    });
    document.getElementById("move3").addEventListener("click", function() {
        Battle(25);
    });
    document.getElementById("move4").addEventListener("click", function() {
        Battle(45);
    });
    document.getElementById("run").addEventListener("click", Leave);

    // Define global variables
    let StartingHealth = 10;
    let health = 10;

    // Call the function to fetch enemies when the script is loaded
    GetLevel();
    GetEnemy();

    function Question() {
        let random = Math.floor(Math.random() * 10) + 1;
        let answer = questions[`answer${random}`];
        let question = questions[`question${random}`];

        console.log("Question:", question);
        console.log("Answer:", answer);

        let response;
        do {
            response = prompt(question ? question.toLowerCase() + " (y/n)" : "Question not available (y/n)");
        } while (response !== "y" && response !== "n");
        
        if (response === answer) {
            return true;
        } else {
            return false;
        }
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

                updateHealthEnemy.innerHTML = `Enemy: ${eHealth}`;
            } else {
                console.log("No enemies found at or below user's level.");
            }
        })
        .catch(error => console.log('error', error));
    }

    function Battle(attack) {
        let correct = Question();
        if (correct) {
            eHealth -= attack;
            updateHealthEnemy.innerHTML = `Enemy: ${eHealth}`;
        } else {
            health -= eAttack;
            updateHealth.innerHTML = `Player: ${health}`;
        }
        if (health <= 0) {
            window.location.href = "{{site.baseurl}}/islandmap";
        }
        if (eHealth <= 0) {
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
            window.location.href = "{{site.baseurl}}/islandmap";
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
            console.log(data.accountLevel);
            console.log(userLevel);
            levelUpdate.innerHTML = "Player Level:" + userLevel;
            return userLevel;
        })
        .catch(error => console.log('error', error));
    }
</script>