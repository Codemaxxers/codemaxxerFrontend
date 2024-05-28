---
layout: none
permalink: /phishing
---

<style>
    body {
      text-align: center;
    }
    #game-container {
      margin: 50px;
    }
    #play-container {
      style.display: none;
    }
    #result {
      font-weight: bold;
      margin-top: 20px;
    }
    .button {
    padding: .5rem 2rem;
    color: var(--white) !important;
    background-color: var(--primary-color);
    border-radius: 5px;
    border: none;
    }   
    
    .button-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
    .startBtn {
      background-color: #c0eefc;
      z-index: 9999;
    }
</style>

<html>
<div id="game-container">
  <h1>Email Phishing Game 8</h1>
  <br>
  <button id="startBt" class="startBt" onclick="startGame()">Start</button>
  <br>
  <div id="play-container">
    <p id="email-text"></p>
    <br>
    <br>
    <button class="button" onclick="checkAnswer(true)">Legitimate Email</button>
    <button class="button" onclick="checkAnswer(false)">Phishing Email</button>
    <br>
    <br>
    <p id="result"></p>
    <div class="button-container">
      <a href="{{ site.baseurl }}/passwordintro" class="button">Continue</a>
    </div>
  </div>
</div>
<div id="games-played-div">
    <h1 id="gamesPlayed"></h1>
</div>
</html>
