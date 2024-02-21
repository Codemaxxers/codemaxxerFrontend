---
layout: profile
search_exclude: true
--- 


<div id="profile-container">
    <img id="playerImage" src="game/img/player.png">
    <br>
    <div id="playerStats">
        <h1  class="centered">Player Stats</h1><hr/>
        <h1 id="characterHealth"></h1>
        <h1 id="characterDamage"></h1>
    </div>
</div>

<div id="inventory">
</div>

<style>
    .page-content {
        margin-left: 270px;
    }

    #profile-container, #inventory{
        display: flex;
        align-items: flex-start; /* Align items to the top */
        margin: 50px auto;
        padding: 20px;
        max-width: 800px; /* Adjust as needed */
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    #playerImage {
        width: 40%;
        height: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-left: 30%;
    }

    #characterHealth,
    #characterDamage {
        color: white;
        margin-left: 0% !important;
    }

</style>

<script>
    function fetchArmorStats(armorID) {
        return fetch('gear.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch armor stats');
                }
                return response.json();
            })
            .then(data => {
                // Find armor stats by armorID
                const armorStats = data.items.find(item => item.gearID === armorID);
                if (!armorStats) {
                    throw new Error('Armor stats not found');
                }
                return armorStats;
            });
    }


    window.onload = function() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            credentials: "include"
        };

        fetch("http://localhost:8032/api/person/characterData", requestOptions)
            .then(response => {
                if (!response.ok) {
                    const errorMsg = 'Login error: ' + response.status;
                    console.log(errorMsg);

                    switch (response.status) {
                        case 401:
                            alert("Please log into or make an account");
                            window.location.href = "login";
                            break;
                        case 403:
                            alert("Access forbidden. You do not have permission to access this resource.");
                            break;
                        case 404:
                            alert("User not found. Please check your credentials.");
                            break;
                        default:
                            alert("Login failed. Please try again later.");
                    }

                    return Promise.reject('Login failed');
                }
                return response.json();
            })
            .then(data => {
                var characterHealthElement = document.getElementById('characterHealth');
                characterHealthElement.innerHTML = '<img src="game/img/heart.png" style="width: 35px; height: auto; margin-bottom: 5px;">' + " " + data.statsArray[0][0];
                
                var characterDamageElement = document.getElementById('characterDamage');
                characterDamageElement.innerHTML = '<img src="game/img/sword.png" style="width: 35px; height: auto; margin-bottom: 5px;">' + " " + data.statsArray[1][0];

                var inventoryDiv = document.getElementById('inventory');
                for (var i = 0; i < data.inventory.length; i++) {
                    var armorImg = document.createElement('img');
                    armorImg.src = "https://codemaxxers.github.io/codemaxxerFrontend/game/img/armor/" + data.inventory[i] + ".png";
                    armorImg.style.width = "80px"; // Adjust the width as needed
                    armorImg.style.height = "auto"; // Adjust the height as needed
                    armorImg.style.marginRight = "10px"; // Adjust margin as needed

                    armorImg.dataset.inventoryID = data.inventory[i];

                    inventoryDiv.appendChild(armorImg);
                }
            })
            .catch(error => console.log('error', error));

        // Add event listener to the inventory container for event delegation
        document.getElementById('inventory').addEventListener('mouseover', function(event) {
            var target = event.target;
            var armorID = parseInt(target.dataset.inventoryID);
            if (target.tagName === 'IMG') {
                // Remove existing armor stats
                var existingArmorStats = document.querySelector('.armor-stats');
                if (existingArmorStats) {
                    existingArmorStats.remove();
                }

                var armorStats = document.createElement('div');
                fetchArmorStats(armorID)
                    .then(armor => {
                        armorStats.textContent = `${armor.name} - ${armor.healthAdded} Health`;
                    })
                    .catch(error => {
                        armorStats.textContent = "[Insert Armor Stats Here]";
                        console.log('error', error);
                    });
                armorStats.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                armorStats.style.color = "white";
                armorStats.style.position = "absolute";
                armorStats.style.top = target.offsetTop + "px";
                armorStats.style.left = (target.offsetLeft + target.offsetWidth + 10) + "px";
                armorStats.style.padding = "5px";
                armorStats.style.borderRadius = "5px";
                armorStats.classList.add('armor-stats'); // Add a class for easier identification and removal
                document.body.appendChild(armorStats);
            }
        });


        // Add event listener to the inventory container for event delegation
        document.getElementById('inventory').addEventListener('mouseleave', function(event) {
            var target = event.relatedTarget || event.toElement;
            if (!target || !target.classList.contains('armor-stats')) {
                var armorStats = document.querySelector('.armor-stats');
                if (armorStats) {
                    armorStats.remove();
                }
            }
        });
    }
</script>
