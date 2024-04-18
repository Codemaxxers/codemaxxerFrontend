---
toc: true
layout: post
title: Gravity game
author: Grace
permalink: /gravity
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
</head>
<body>
    <canvas id="gameCanvas" width="1200" height="800"></canvas>
    <div id="typingBar">
        <input type="text" id="userInput" placeholder="Type the definition">
        <div id="inputHistory"></div>
    </div>
    <script>
        //test
        window.onload = function () {
        fetchTerm();
    };
    function fetchTerm() {
        var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        };
        fetch('http://localhost:8032/api/terms/randomTerm/csp')
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Extract term and definition from the data
            const term = data.term;
            const definition = data.definition;
            // Now you can use term and definition variables as needed
            console.log('Term:', term);
            console.log('Definition:', definition);
            // Example: Save term and definition to variables
            const termAndDefinition = {
            term: term,
            definition: definition
            };
            // Do whatever you need with termAndDefinition
            // console.log('Term and Definition:', termAndDefinition);
            return term;
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
    }
        //
        //
        //
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const userInput = document.getElementById("userInput");
        const inputHistory = document.getElementById("inputHistory");
        const termsAndDefinitions = [
            { term: "Firewall", definition: "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules." },
            { term: "Encryption", definition: "The process of converting information into a code to prevent unauthorized access." },
            { term: "Phishing", definition: "A fraudulent attempt to obtain sensitive information, such as usernames, passwords, and credit card details, by disguising as a trustworthy entity in an electronic communication." },
            { term: "Malware", definition: "Malicious software designed to harm or exploit computers, networks, and users." },
            { term: "Cybersecurity", definition: "The practice of protecting systems, networks, and programs from digital attacks, theft, and damage." },
            { term: "Zero-day Exploit", definition: "An attack that targets a previously unknown vulnerability in a computer application or operating system, exploiting it before the vendor releases a patch." },
            { term: "DOS", definition: "An attack that aims to make a machine or network resource unavailable to its intended users by overwhelming it with traffic or other forms of disruption." },
            { term: "VPN", definition: "A secure and encrypted connection established over the internet, providing a private network-like environment for communication and data exchange." },
            { term: "Two-Factor Authentication", definition: "A security process in which a user provides two different authentication factors to verify their identity, usually something they know (password) and something they have (security code from a mobile app)." },
            { term: "Social Engineering", definition: "The manipulation of individuals to divulge confidential information or perform actions that may compromise security." },
            { term: "Botnet", definition: "A network of compromised computers, controlled by a single entity or attacker, used to perform malicious activities such as sending spam or launching DDoS attacks." },
            { term: "Cryptography", definition: "The practice and study of techniques for securing communication and data from adversaries." },
            { term: "Virus", definition: "A type of malicious software that self-replicates and spreads to other computers, often causing damage to data or disrupting system functionality." },
            { term: "Patch", definition: "A piece of software designed to update or fix problems with a computer program or its supporting data." },
            { term: "IoT", definition: "A network of interconnected devices embedded with sensors, software, and network connectivity, enabling them to collect and exchange data." },
            { term: "DDoS", definition: "A type of cyber attack that disrupts the normal functioning of a network or website by overwhelming it with a flood of internet traffic from multiple sources." },
            { term: "Hashing", definition: "The process of converting input data (such as passwords) into a fixed-size string of characters, typically for secure storage or verification purposes." },
            { term: "Endpoint Security", definition: "The practice of protecting computer networks accessed by remote devices such as laptops, smartphones, and tablets." },
            { term: "Cyber Threat Intelligence", definition: "Information that provides an organization with insights into potential cyber threats, helping them make informed decisions to protect against cyber attacks." },
            { term: "Biometric Authentication", definition: "A security process that uses unique biological features (such as fingerprints or facial recognition) to verify an individual's identity." },
            { term: "Incident Response", definition: "The process of responding to and managing a cybersecurity incident, including identification, containment, eradication, recovery, and lessons learned." },
        ];
        let rocks = [];
        let score = 0;
        function newRock() {
            const termDefinitionPair = termsAndDefinitions[Math.floor(Math.random() * termsAndDefinitions.length)];
            let newX, newY;
            do {
                newX = Math.random() * (canvas.width - 200) + 50;
                newY = 0
            } while (isOverlapping(newX, newY));
            const rock = {
                term: termDefinitionPair.term,
                definition: termDefinitionPair.definition,
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
                    return true; // Overlapping
                }
            }
            return false; // Not overlapping
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
        function gameLoop() {
            newRock();
            checkInput();
            setTimeout(gameLoop, 10000);
        }
        userInput.addEventListener("input", checkInput);
        gameLoop();
        draw();
    </script>
</body>
</html>

