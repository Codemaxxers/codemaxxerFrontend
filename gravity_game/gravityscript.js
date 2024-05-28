const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const userInput = document.getElementById("userInput");
const inputHistory = document.getElementById("inputHistory");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const restartButton = document.getElementById("restartButton");
const typingBar = document.getElementById("typingBar");
const startCSP = document.getElementById("startCSP");
const startCSA = document.getElementById("startCSA");
const startCyber = document.getElementById("startCyber");
const finalScore = document.getElementById("finalScore");
let rocks = [];
let score = 10;
let topic = "";
let gameRunning = false;
const backgroundImage = new Image();
backgroundImage.src = 'https://cdn.discordapp.com/attachments/879557685253664768/1242892319342989372/pxArt_1.png?ex=6654c32c&is=665371ac&hm=7d50e59a366be1564e290f0d7a68fe639b24ccf7a540ce01d83adf4ae31d4c4e&';
backgroundImage.onload = function() {
    draw();
};
async function fetchTerm(topic) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
    };
    try {
        const response = await fetch(uri + '/api/terms/randomTerm/' + topic, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const termAndDefinition = {
            term: data.term,
            definition: data.definition
        };
        console.log(termAndDefinition);
        return termAndDefinition;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}
async function newRock() {
    const termData = await fetchTerm(topic);
    if (!termData) {
        return;
    }
    const { term, definition } = termData;
    let newX, newY;
    do {
        newX = Math.random() * (canvas.width - 300) + 100;
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
    ctx.fillStyle = "white";
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
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * fontSize);
    }
}
function draw() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    for (const rock of rocks) {
        drawText(rock.definition, rock.x, rock.y);
        rock.y += rock.speed;
        if (rock.y > canvas.height) {
            const index = rocks.indexOf(rock);
            rocks.splice(index, 1);
            score -= 1;
            if (score <= 0) {
                endGame();
                return;
            }
        }
    }
    drawText(`Score: ${score}`, 50, 750);
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
        }
    }
}
async function gameLoop() {
    if (!gameRunning) return;
    await newRock();
    checkInput();
    setTimeout(gameLoop, 10000);
}
function startGame(selectedTopic) {
    startScreen.style.display = "none";
    endScreen.style.display = "none";
    canvas.style.display = "block";
    typingBar.style.display = "block";
    topic = selectedTopic;
    score = 10;
    rocks = [];
    gameRunning = true;
    gameLoop();
    draw();
}
function endGame() {
    gameRunning = false;
    finalScore.textContent = score;
    endScreen.style.display = "block";
    canvas.style.display = "none";
    typingBar.style.display = "none";
}
userInput.addEventListener("input", checkInput);
startCSP.addEventListener("click", () => startGame("csp"));
startCSA.addEventListener("click", () => startGame("csa"));
startCyber.addEventListener("click", () => startGame("cyber"));
restartButton.addEventListener("click", () => startGame(topic));