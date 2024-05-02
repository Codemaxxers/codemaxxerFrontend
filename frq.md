---
toc: true
comments: true
layout: battle
title: frq editor
author: Luna I
permalink: /frq
---


<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Content</title>
  <style>
    body, html {
      height: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    #container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    #image-container {
      flex: 1;
      margin-right: 20px;
    }
    #image {
      width: 100%;
      height: auto;
    }
    #button-container {
      flex: 1;
      margin-bottom: 20px;
    }
    #sentences-container {
      flex: 1;
      margin-right: 20px;
    }
    #user-input {
      flex: 1;
    }
    #output {
      flex: 1;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div id="content">
    <div id="container">
      <div id="image-container">
        <img id="image" src="default-image.jpg" alt="Image">
        <button onclick="changeImage()">Next FRQ</button>
      </div>
      <div id="button-container">
        <button onclick="changeSentence()">Tips</button>
      </div>
      <div id="sentences-container">
        <p id="sentence">This is the default sentence.</p>
      </div>
      <div id="user-input">
        <input type="text" id="userInput" placeholder="Type here...">
      </div>
      <div id="output">
        <p id="outputText">Output will appear here.</p>
      </div>
    </div>
  </div>

  <script>
    // Array of sentences
    const sentences = [
      "Express in print form the proper syntax to represent a described algorithm or program.Express in print form the proper syntax to represent a described algorithm or program.",
      "Pay attention to task verbs",
      "Try to solve all parts of a question.",
      "Be organized and clear in your programming.",
      "Sentence 5"
    ];

    // Function to change the image
    function changeImage() {
      const image = document.getElementById("image");
      // Change the image source here
      image.src = "frq1.png";
    }

    // Function to change the sentence
    function changeSentence() {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const sentence = sentences[randomIndex];
      const sentenceElement = document.getElementById("sentence");
      sentenceElement.textContent = sentence;
    }

    // Function to handle user input
    document.getElementById("userInput").addEventListener("input", function() {
      const userInput = document.getElementById("userInput").value;
      const outputText = document.getElementById("outputText");
      outputText.textContent = userInput;
    });

    // Function to change the sentence automatically every 5 minutes
    setInterval(changeSentence, 5 * 60 * 1000);
  </script>
</body>


