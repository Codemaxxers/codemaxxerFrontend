---
layout: none
permalink: /password
---

<html>
<body>
    <div class="container">
        <button onclick="goBack()" id="backBtn" class="backBtn">Back</button>
        <h2>Password Game</h2>
        <br>
        <button id="startBtn" class="startBtn" onclick="startGame()">Start</button>
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
</html>

<style>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
* {
font-family: "DotGothic16", sans-serif;
box-sizing: border-box;
}

:root {
      --pastel-pink: #ffb6c1;
      --dark-pink: #ff69b4;
      --purple: #9b30ff;
      --blue: #4169e1;
      --black: #000000;
      --green: #90EE90;
      --red: #ffb6c1;
      --gray: #A9A9A9;
      --yellow: #FFD700;
      --font-family: 'Comic Sans MS', cursive, sans-serif;
    }

.startBtn,
.check_button {
    border: 2px solid black;
}
.startBtn {
    background-color: var(--pastel-pink);
}

#play_container {
display: none;
}

h2 {
    color: rgb(218, 165, 32); /* golden yellow color!*/
}

.container {
    width: 300px;
    margin: 0 auto;
    display: flex; /* Use flexbox */
    flex-direction: column; /* Stack children vertically */
    justify-content: center; /* Center content vertically */
    height: 100vh; /* Set height to full viewport height */
}

.container input {
    width: 100%;
    margin: 0 auto;
    text-align: center; /* Center align the content */
    /* padding: 10px;
    margin-top: 10px; */
}

.container button {
    width: fit-content;
    padding: .4rem 1rem;
    font-size: 1.2rem;
    white-space: nowrap;
    background-color: var(--primary-color);
    color: var(--white);
    outline: none;
    border-radius: 10px; 
    transition: .3s;
    cursor:pointer;
}

.container button:hover {
        background-color: var(--primary-color-dark);
    }

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.backBtn:hover {
        background-color: #ddd;
    }
    .backBtn{
        border: 3px solid black;
        cursor: pointer;
        font-size: 20px;
        border-radius: 10px;
        position: absolute; left: 20px; top: 10px;
    }

.passwordInput {
    padding: 10px;
}
</style>


<script>
    var backBtn = document.getElementById("back-btn");
    function goBack() {
        window.location.href = '{{site.baseurl}}/compscreen';
    }
    var timeSet;
    var constant = 0;
    var seconds = 0;
    var minutes = 0;

     function incrementTime() {
        constant++; //constant second count separate from seconds
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        // update time display on page
        document.getElementById("timerDisplay").innerText = minutes + ":" +(seconds < 10 ? "0":"") + seconds;
    };

    function startTimer() {
        seconds = 0;
        minutes = 0;
        constant = 0;
        timeSet = setInterval(incrementTime, 1000);
    }

    function stopTimer() {
        clearInterval(timeSet);
        // alert display final time
        alert("Time: " + minutes + ":" + (seconds < 10 ? "0":"") + seconds);

    }

    function closeModal() {
        document.getElementById("resultModal").style.display = "none";
    }

    function openModal() {
        document.getElementById("resultModal").style.display = "block";
    }

    function restartGame() {
        constant = 0;
        seconds = 0;
        minutes = 0;
        document.getElementById("timerDisplay").innerText = "0:00";

        // clear password input
        document.getElementById("passwordInput").value = "";

        // UI elements
        document.getElementById("play_container").style.display = "none";
        document.getElementById("startBtn").style.display = "block"; 
        document.getElementById("restart_button").style.display = "none";

        // result displays
        document.getElementById("strengthResult").textContent = "-";
        document.getElementById("crackTimeResult").textContent = "-";
        closeModal(); 
    }

    // based off password checker zxcvbn library
    function evaluatePasswordStrength(password) {
         let score = 0;

        // basic check
        const length = password.length;
        const uppercase = /[A-Z]/.test(password);
        const lowercase = /[a-z]/.test(password);
        const digits = /[0-9]/.test(password);
        const specialChars = /\W/.test(password);
        const commonPasswords = ["123", "456", "password", "admin", "qwerty", "abc123", "hello"]; // Example common passwords

        // increase - diversity and length
        if (length > 8) score += 1;
        if (length > 12) score += 2;
        if (uppercase&&lowercase) score += 1;
        if (digits) score += 1;
        if (specialChars) score += 1;

        // decrease - common passwords
        if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
            score = Math.max(score - 5, 0); 
        }

        // entropy estimation
        let charSetSize = (uppercase ? 26 : 0) + (lowercase ? 26 : 0) + (digits ? 10 : 0) + (specialChars ? 32 : 0);
        let entropy = length * Math.log2(charSetSize);
        
        // score based on entropy (based on zxcvbn, simplified)
        if (entropy > 100) score = Math.min(score + 2, 5); // very strong
        else if (entropy > 80) score = Math.min(score + 1, 4); // strong

        // est. crack time based on entropy (based on zxcvbn, simplified)
        let timeToCrack = estimateCrackTime(entropy);

        // score to strength categories
        let strength = ["Very Weak", "Weak", "Fair", "Medium", "Strong", "Very Strong"][score];
        // alert(score);

        return {strength, timeToCrack};
    }

    function estimateCrackTime(entropy) {
        // Simplified est (real time is based on diff types of attack models and hardware)
        if (entropy < 50) return "Instant";
        else if (entropy < 80) return "Seconds";
        else if (entropy < 100) return "Hours";
        else if (entropy < 120) return "Days";
        else return "Centuries";
    }

    const playContainer = document.getElementById("play_container");
    const startButton = document.getElementById("start_button");
    const checkButton = document.getElementById("check_button");
    
    const timerDisplay = document.getElementById("timerDisplay");

    function startGame() {
        startTimer();
        playContainer.style = "display:block;";
        startBtn.style = "display:none;";
    }

    function checkPassword() {
        var password = document.getElementById("passwordInput").value;

        // requirements w/ condition and element id
        var requirements = [
            {condition: password.length >= 8, elementId: "length"},
            {condition: /[A-Z]/.test(password), elementId: "uppercase"},
            {condition: /[a-z]/.test(password), elementId: "lowercase"},
            {condition: /[0-9]/.test(password), elementId: "numbers"},
            {condition: /[\W_]/.test(password), elementId: "specialChars"}
        ];

        // hide all requirments except first
        requirements.forEach((req, index) => {
            if(index > 0) { 
                document.getElementById(req.elementId).style.display = "none";
            }
        });

        // loop each requirement
        var allMet = true;
        for (var i = 0; i < requirements.length; i++) {
            var req = requirements[i];
            if (req.condition) {
                document.getElementById(req.elementId).style.display = "list-item"; // show requirement
                document.getElementById(req.elementId).style.color = "green"; // green if requirement met
                // show next requirement if there is another
                if (i + 1 < requirements.length) {
                    document.getElementById(requirements[i + 1].elementId).style.display = "list-item";
                }
            } else {
                document.getElementById(req.elementId).style.color = "red"; // red if requirement is not met
                allMet = false; // allMet set false if not all requirements met
                break; // exit loop bc found requirement that's not met
            }
        }
        // if all requirements are met
        if (allMet) {
            var { strength, timeToCrack} = evaluatePasswordStrength(password);

            document.getElementById("strengthResult").textContent = `Strength: ${strength}`;
            document.getElementById("crackTimeResult").textContent = `Estimated Crack Time: ${timeToCrack}`;
            document.getElementById("restart_button").style.display = "block"; // show restart button all requirements met

            openModal();
            stopTimer();
        }
    }

    
    //add game session time to backend database 
    var deployURL = "http://localhost:8013";
    function updateTime() {
        var gameId = 1;
        var payload = {
            gameId: gamedId,
            timeScore: minutes*60 + seconds,
        };
        fetch(deployURL + `/api/gamesession/${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // convret payload to JSOn
        })
        .then((response) => response.json())
        .then((newGamesession) => { 
            console.log('Game session updated:', newGameSession)
        })
        .catch(error => {
            console.error('Error updating game session:', error)
        });
    }

    
</script>