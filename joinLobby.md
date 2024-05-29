---
layout: menulayout
search_exclude: true
---

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap">
<script src="connectionURI.js"></script>

<style>
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .fadeAnimation {
        animation: fade-in 0.5s;
    }
    #backIcon {
        position: absolute;
        top: 40px;
        left: 40px;
        color: white;
        font-size: 5em;
        transition: all .3s ease-in-out;
    }
    body {
        font-family: 'Noto Sans Mono', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f0f0;
    }
    .lobby-list {
        margin-top: 20%;
        width: 700px; /* Change the width percentage or use an absolute width */
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow-y: scroll; /* Change from 'auto' to 'scroll' */
        max-height: 72vh; /* Set a maximum height to trigger scrolling */
        margin-left: 5%; /* Adjust margin if needed */
    }
    .lobby-item {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .lobby-item button {
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .lobby-item button:hover {
        background-color: #0056b3;
    }
</style>

<div class="fadeAnimation">
    <a href="multiplayer"><i class="bx bx-arrow-back" id="backIcon"></i></a>
    <div class="lobby-list">
        <h2>Available Lobbies</h2>
        <div id="lobbyContainer"></div>
    </div>
</div>

<script>
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

fetch(connectionuri + "/api/lobby/availableLobbies", requestOptions)
    .then((response) => response.json())
    .then((data) => {
        const lobbyContainer = document.getElementById("lobbyContainer");
        Object.keys(data).forEach((lobbyId) => {
            const lobbyData = data[lobbyId];
            const lobbyItem = document.createElement("div");
            lobbyItem.classList.add("lobby-item");
            lobbyItem.style.color = "black"; // Add this line to set text color to black

            let playersText = "Empty Lobby"; // Default text for no players
            const players = Object.keys(lobbyData.players);
            if (players.length > 0) {
                playersText = "In Lobby: " + players.join(", ");

                // Add health and damage only if there's a player in the lobby
                const player = lobbyData.players[players[0]];
                lobbyItem.innerHTML = `
                    <div># ${lobbyData.id}</div>
                    <div>${playersText}</div>
                    <div>Health: <img src="game/img/heart.png" style="width: 20px; height: auto;"> ${player.health}</div>
                    <div>Damage: <img src="game/img/sword.png" style="width: 20px; height: auto;"> ${player.attack}</div>
                    <button onclick="joinLobby('${lobbyData.id}')">Join</button>
                `;
            } else {
                // No players in the lobby, display default text
                lobbyItem.innerHTML = `
                    <div># ${lobbyData.id}</div>
                    <div>${playersText}</div>
                    <button onclick="joinLobby('${lobbyData.id}')">Join</button>
                `;
            }

            lobbyContainer.appendChild(lobbyItem);
        });
    })
    .catch((error) => console.error(error));

function joinLobby(lobbyId) {
    // Add your code for joining a lobby here
    console.log("Joining lobby:", lobbyId);
}


</script>

