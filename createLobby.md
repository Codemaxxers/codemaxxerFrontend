---
layout: menulayout
search_exclude: true
---

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap">
<script src="uri.js"></script>

<style>
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
        width: 700px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow-y: scroll;
        max-height: 72vh;
        margin-left: 5%;
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
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    input[type="number"] {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    input[type="submit"] {
        padding: 8px 16px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    input[type="submit"]:hover {
        background-color: #218838;
    }
    #blackText {
        color: black;
    }
</style>

<a href="multiplayer"><i class="bx bx-arrow-back" id="backIcon"></i></a>
<div class="lobby-list">
    <h2>Create Lobby</h2>
    <form id="create-lobby-form">
        <label id="blackText" for="lobby-number">Lobby Number (1-99):</label>
        <input type="number" id="lobby-number" name="lobby-number" min="1" max="99" required>
        <input type="submit" value="Create Lobby">
    </form>
</div>

<script>
    document.getElementById('create-lobby-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const lobbyNumber = document.getElementById('lobby-number').value;
        
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

    fetch(`http://127.0.0.1:8033/api/lobby/createLobby?lobbyId=${lobbyNumber}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    });
</script>
