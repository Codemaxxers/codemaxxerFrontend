---
layout: none
title: Gravity game
author: Grace
permalink: /gravitycsp
---
<script src="uri.js"></script>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gravity Game</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
            position: relative;
        }
        canvas {
            display: block;
            background-color: white;
        }
        #typingBar {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
        input {
            font-size: 16px;
            width: 300px;
            padding: 10px;
            margin-top: 20px;
        }
        #inputHistory {
            font-size: 16px;
            margin-top: 20px;
        }
    </style>
    <script src="uri.js"></script>
</head>
<body>
    <canvas id="gameCanvas" width="1200" height="800"></canvas>
    <div id="typingBar">
        <input type="text" id="userInput" placeholder="Type the definition">
        <div id="inputHistory"></div>
    </div>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const userInput = document.getElementById("userInput");
        const inputHistory = document.getElementById("inputHistory");
        // Fetches new term from bank
        async function fetchTerm() {
            var requestOptions = {
                method: 'GET',
                mode: 'cors',
                cache: 'default',
                credentials: 'include',
            };
            try {
                const response = await fetch(uri + '/api/terms/randomTerm/csp', requestOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const termAndDefinition = {
                    term: data.term,
                    definition: data.definition
                };
                console.log('Term and Definition:', termAndDefinition);
                return termAndDefinition;
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                return null;
            }
        }
        let rocks = [];
        let score = 10;
        async function newRock() {
            const termData = await fetchTerm();
            if (!termData) {
                return;
            }
            const { term, definition } = termData;
            let newX, newY;
            do {
                newX = Math.random() * (canvas.width - 200) + 50;
                newY = 0;
            } while (isOverlapping(newX, newY));
            const rock = {
                term: term,
                definition: definition,
                x: newX,
                y: newY,
                speed: .1
            };
            rocks.push(rock);
        }
        function isOverlapping(newX, newY) {
            for (const rock of rocks) {
                const distance = Math.sqrt((newX - rock.x) ** 2 + (newY - rock.y) ** 2);
                if (distance < 200) {
                    return true;
                }
            }
            return false;
        }
        function drawText(text, x, y, width = 200, height = 200, fontSize = 18) {
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = "black";
            // Split the text into lines that fit within the specified width
            const lines = [];
            let currentLine = "";
            const words = text.split(' ');
            for (const word of words) {
                const testLine = currentLine + (currentLine === "" ? "" : " ") + word;
                const testWidth = ctx.measureText(testLine).width;
                if (testWidth > width && currentLine !== "") {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);
            // Draw each line on a new line
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], x, y + i * fontSize);
            }
        }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw rocks
            for (const rock of rocks) {
                drawText(rock.definition, rock.x, rock.y);
                rock.y += rock.speed;
                // Check if the rock reaches the bottom
                if (rock.y > canvas.height) {
                    const index = rocks.indexOf(rock);
                    rocks.splice(index, 1);
                    score -= 1;
                }
            }
            // Draw user input
            drawText(`Score: ${score}`, 50, 600);
            // Display input history
            inputHistory.textContent = "Input History: " + userInput.value;
            requestAnimationFrame(draw);
        }
        function checkInput() {
            const userTyped = userInput.value.trim().toLowerCase();
            for (const rock of rocks) {
                if (userTyped === rock.term.toLowerCase()) {
                    const index = rocks.indexOf(rock);
                    rocks.splice(index, 1);
                    score += 1;
                    userInput.value = "";
                    inputHistory.textContent = "Input History: ";
                }
            }
        }
        async function gameLoop() {
            await newRock();
            checkInput();
            setTimeout(gameLoop, 10000);
        }
        userInput.addEventListener("input", checkInput);
        gameLoop();
        draw();
    </script>
</body>
</html>