var uri;
if (location.hostname === "localhost") {
    uri = "http://localhost:8032";
} else if (location.hostname === "127.0.0.1") {
    uri = "http://127.0.0.1:8032";
} else {
    uri = "https://codemaxxers.stu.nighthawkcodingsociety.com";
}

// Define a global array to store enemy IDs
let enemyIds = []; 
// Div updates
var updateHealthEnemy = document.getElementById("EnemyHealth");
var questionBox = document.getElementById("question-box");
var updateHealth = document.getElementById("health");
var levelUpdate = document.getElementById("level");
var enemyIMG = document.getElementById("eIMG");
var playerIMG = document.getElementById("pIMG");
var controller = document.getElementById("moves");
var alert = document.getElementById("alert");
var alertBox = document.getElementById("home-btn");
var weaponMenu = document.getElementById("weaponMenu");
var enemyName = document.getElementById("EnemyName");
var updateHealth = document.getElementById("health");
var updateDamage = document.getElementById("damage");

var eHealth = 40;
var eAttack = 0;
var eDefense = 0;
var eName = "";
let userLevel = 1;
let totalPoints = 0;

let health = 10;
let damage = 0;

let course = "csp";

GetLevel();

var baseHTML = `
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
`

var ATKmove = `
    <div class="move" id="move1">
        <h1>Scratch</h1>
        <p><b>5 Damage</b></p>
    </div>
    <div class="move" id="move2">
        <h1>Thunderbolt</h1>
        <p><b>15 Damage</b></p>
    </div>
    <div class="move" id="move3">
        <h1>Fireball</h1>
        <p><b>25 Damage</b></p>
    </div>
    <div class="move" id="back">
        <h1>Back</h1>
    </div>
    `

var comingsoon = `
    <div class="move" id="back">
        <h1>Back</h1>
    </div>
`

document.getElementById("alert").addEventListener("click", function() {
    window.location.pathname = '/codemaxxerFrontend/game/index.html'
});

function inventoryMENU() {
    controller.innerHTML = comingsoon;
    weaponMenu.style.display = "block";
    document.getElementById("back").addEventListener("click", function() {
        controller.innerHTML = baseHTML;
        weaponMenu.style.display = "none";
    });
}
function potionMENU() {
    controller.innerHTML = comingsoon;
    document.getElementById("back").addEventListener("click", function() {
        controller.innerHTML = baseHTML;
    });
}

function attackMENU() {
    controller.innerHTML = ATKmove;
    document.getElementById("move1").addEventListener("click", function() {
        i = 5 + damage;
        Battle(i);
    });
    document.getElementById("move2").addEventListener("click", function() {
        i = 15 + damage;
        Battle(i);
    });
    document.getElementById("move3").addEventListener("click", function() {
        i = 25 + damage;
        Battle(i);
    });
    document.getElementById("back").addEventListener("click", function() {
        controller.innerHTML = baseHTML;
    });
}

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
    
    fetch(uri + `/api/questions/randomQuestion/${course}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); // For debugging
        // Update the question text
        document.getElementById("question-text").innerText = result.question;

        // Clear previous answers
        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";
        totalPoints = totalPoints + result.points;

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
    // Increment total points regardless of the answer
    totalPoints += attackValue;

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
    }

    // Call Battle to check for end-of-battle scenarios
    questionBox.style = " display: none;";
    controller.innerHTML = baseHTML;

    if (health <= 0) {
        alert.style = "";
        playerIMG.classList = "death";
        alertBox.innerHTML = "<b>You Lost</b><p>Go back to island</p>";
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
        fetch(uri + `/api/person/addPointsCSA?points=${totalPoints}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        //Re-direct to island
        alert.style = "";
        enemyIMG.classList = "death";
        alertBox.innerHTML = "<b>You Won</b><p>Go back to island</p>";
        return;
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

    fetch(uri + "/api/enemies", requestOptions)
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
            enemyName.innerHTML = `Enemy: ${eName}`;

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
    questionBox.style = "";
    fetchQuestion(attack); // Call fetchQuestion with the attack
    value
    // Check if the player or enemy has been defeated
    if (health <= 0) {
        alert.style = "";
        playerIMG.classList = "death";
        alertBox.innerHTML = "<b>You Lost</b><p>Go back to island</p>";
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
        fetch(uri + `/api/person/addPointsCSA?points=${totalPoints}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        //Re-direct to island
        alert.style = "";
        enemyIMG.classList = "death";
        alertBox.innerHTML = "<b>You Won</b><p>Go back to island</p>";
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

fetch(uri + "/api/person/jwt", requestOptions)
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
        levelUpdate.innerHTML =  "Player Level: " + userLevel;
        console.log(data.accountLevel);
        console.log(data.totalHealth);
        health = data.totalHealth;
        updateHealth.innerHTML = `Player: ${health}`;
        updateDamage.innerHTML = `Damage: ${data.totalDamage}`
        console.log(data.totalDamage);
        damage = data.totalDamage;
        console.log(userLevel);
        return userLevel;
    })
    .catch(error => console.log('error', error));
}

document.addEventListener("DOMContentLoaded", () => {
    
    const requestOptions = {
        method: "GET",
        redirect: "follow",
        credentials: "include"
    };

    fetch(uri + "/api/person/getWeaponInventory", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
});