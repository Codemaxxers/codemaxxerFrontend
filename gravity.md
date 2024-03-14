---
toc: true
layout: post
title: Gravity game
author: Grace
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
    <title>Knowledge Test Game</title>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <div id="typingBar">
        <input type="text" id="userInput" placeholder="Type the definition">
        <div id="inputHistory"></div>
    </div>
    <script>
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
            { term: "Denial-of-Service", definition: "An attack that aims to make a machine or network resource unavailable to its intended users by overwhelming it with traffic or other forms of disruption." },
            { term: "VPN", definition: "A secure and encrypted connection established over the internet, providing a private network-like environment for communication and data exchange." },
            { term: "Two-Factor Authentication", definition: "A security process in which a user provides two different authentication factors to verify their identity, usually something they know (password) and something they have (security code from a mobile app)." },
            { term: "Social Engineering", definition: "The manipulation of individuals to divulge confidential information or perform actions that may compromise security." },
            { term: "Botnet", definition: "A network of compromised computers, controlled by a single entity or attacker, used to perform malicious activities such as sending spam or launching DDoS attacks." },
            { term: "Cryptography", definition: "The practice and study of techniques for securing communication and data from adversaries." },
            { term: "Virus", definition: "A type of malicious software that self-replicates and spreads to other computers, often causing damage to data or disrupting system functionality." },
            { term: "Patch", definition: "A piece of software designed to update or fix problems with a computer program or its supporting data." },
            { term: "IoT (Internet of Things)", definition: "A network of interconnected devices embedded with sensors, software, and network connectivity, enabling them to collect and exchange data." },
            { term: "DDoS (Distributed Denial of Service)", definition: "A type of cyber attack that disrupts the normal functioning of a network or website by overwhelming it with a flood of internet traffic from multiple sources." },
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
            const rock = {
                term: termDefinitionPair.term,
                definition: termDefinitionPair.definition,
                x: Math.random() * (canvas.width - 100) + 50,
                y: 0,
                speed: (Math.random())/10
            };
            rocks.push(rock);
        }
        function drawText(text, x, y, width = 200, height = 200, fontSize = 18) {
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = "#fff";
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

