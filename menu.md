---
layout: menulayout
search_exclude: true
---
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap">

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
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f0f0; /* Change background color as needed */
        margin-top: 10%;
        font-family: 'Noto Sans Mono', sans-serif !important; /* Applying the font to the whole body */
    }

    .imageDiv {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .imageContainer {
        position: relative;
    }

    .image {
        width: 500px; /* Adjust image size as needed */
        height: auto;
        cursor: pointer;
        transition: transform 0.3s ease;
        border-radius: 10px; /* Adjust border radius as needed */
        margin: 20px;
    }

    .gameModeLabel {
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.5em;
        font-weight: bold;
        text-align: center;
        color: #333;
        opacity: 0;
        transition: opacity 0.3s ease, color 0.3s ease;
        font-family: 'Noto Sans Mono', sans-serif !important;
        width: 275px;
        background-color: rgba(0, 0, 0, .8);
    }

    .imageContainer:hover .gameModeLabel {
        opacity: 1;
        color: white;
    }

    .image:hover {
        transform: scale(1.1); /* Adjust scale factor as desired */
    }

    .account-card {
        top: 30px;
        /* right: 10px; Remove this line */
        /* margin-right: 40%; Remove this line */
        /* Add the following lines */
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 300px; /* Adjust width as needed */
        margin-top: 10px;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 20px; /* Adjust bottom margin as needed */
        position: absolute;
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(230,151,8,1) 0%, rgba(255,0,0,1) 100%);
    }

</style>


<a href="dashboard"><i class="bx bx-arrow-back" id="backIcon"></i></a>
<div class="account-card">
    <div id="profilePicture"></div>
</div>

<div class="imageDiv">
    <div class="imageContainer">
        <a href="game/index.html"><img src="images/pixelRoadUpscaled.png" class="image" id="singleImage"></a>
        <div class="gameModeLabel">Single Player</div>
    </div>
    <div class="imageContainer">
        <a href="multiplayer"><img src="images/battle2.jpeg" class="image"></a>
        <div class="gameModeLabel">Multiplayer</div>
    </div>
</div>

<script>
  window.onload = function () {
    fetchUserData();
  };

  function fetchUserData() {
      var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
      };

      // LOCAL TESTING
      // fetch("http://localhost:8032/api/person/jwt", requestOptions)
      fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/jwt", requestOptions)
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
                        // Add more cases for other status codes as needed
                        default:
                            alert("Login failed. Please try again later.");
                    }

                    return Promise.reject('Login failed');
                }
                return response.json();
                // Success!!!
            })
        .then(data => {

          const fullNameArray = data.name.split(' ');
          const firstName = fullNameArray[0];
          console.log(data.profilePicInt)

          let profilePictureDiv = document.getElementById("profilePicture");
          let imgElement = document.createElement("img");
          imgElement.src = "https://codemaxxers.github.io/codemaxxerFrontend/images/profilePics/"+ data.profilePicInt + ".png";
          imgElement.style.width = "60px";
          imgElement.style.height = "60px";
          imgElement.style.float = "left";
          imgElement.style.borderRadius = "5px";
          var nameForProfile = document.createElement("h3");
          nameForProfile.innerHTML = data.name;
          var changeProfileText = document.createElement("p");
          changeProfileText.innerHTML = "Level " + data.accountLevel;
          changeProfileText.style.marginBottom = "0px";

          profilePictureDiv.appendChild(imgElement);
          profilePictureDiv.appendChild(nameForProfile);
          profilePictureDiv.appendChild(changeProfileText);

          changeProfileText.addEventListener("click", function() {
            window.location.href = "settings";
          });

          document.getElementById("initName").innerHTML = "Welcome back, " + firstName;
          document.getElementById("sidebarName").innerHTML = data.name;

          document.getElementById("cspPointDisplay").innerHTML = data.cspPoints + " Points";
          document.getElementById("csaPointDisplay").innerHTML = data.csaPoints + " Points";
          document.getElementById("accountLevelDisplay").innerHTML = data.cspPoints + data.csaPoints + " Points";

          console.log(data);
        })
        .catch(error => console.log('error', error));
  }
</script>