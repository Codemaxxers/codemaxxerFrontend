---
layout: none
title: Gravity game
author: Grace
permalink: /gravity-start
---

<html>
<body>
    <div class="container">
        <!-- <button onclick="goBack()" id="backBtn" class="backBtn">Back</button> -->
        <h2>Gravity Game</h2>
        <br>
        <div class="button-group">
            <button id="startBtn" class="startBtn" onclick="startCSP()">CSP</button>
            <button id="startBtn" class="startBtn" onclick="startCSA()">CSA</button>
            <button id="startBtn" class="startBtn" onclick="startCyber()">Cyber</button>
        </div>
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

.button-group {
    display: flex;
    justify-content: center; /* Aligns buttons to the center horizontally */
    gap: 10px; /* Optional: adds space between the buttons */
}

/* Example button styling (optional) */
.startBtn {
    padding: 10px 20px;
    margin: 5px;
    font-size: 16px;
}
</style>

<script>
function startCSP() {
    window.location.href = '{{site.baseurl}}/gravitycsp';
}
function startCSA() {
    window.location.href = '{{site.baseurl}}/gravitycsa';
}
function startCyber() {
    window.location.href = '{{site.baseurl}}/gravitycyber';
}
</script>