---
layout: profile
search_exclude: true
--- 

<style>
    .page-content {
      padding: 0px !important;
    }

    .container-profile {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      height: 18vh; /* 20% of the viewport height */
      position: absolute;
      top: 0;
      z-index: -1;
      width: 100%;
      background-color: #2a2930;
    }

    .account-card {
      background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(230,151,8,1) 0%, rgba(255,0,0,1) 100%);
      /* background-color: #2f80d0; */
      /* background-color: #2a2930; */
    }

    .sumText {
      margin-left: 330px;
    }

    #initName {
      height: 50px;
      font-size: 36px;
      margin-bottom: 10px;
    }

    #detailText {
      font-size: 22.5px;
    }

    .allBoxes {
      margin-top: 12%;
    }

    .summary-row {
      margin-top: 2%;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }

    .logo {
      width: 105px !important;
      height: auto !important;
    }

    .logo_name {
      font-size: 65px;
      margin-left: 10px;
    }

    .logo_items flex {
      margin-left: 10px;
    }

    #sidebar_close {
      height: 50px;
    }
</style>

<div class="container-profile">
  <div class="summary-row">
    <div class="sumText">
      <h1 id="initName"></h1>
      <h3 id="detailText">Here are your gaming stats!</h3>
    </div>
    <div class="account-card">
      <div id="profilePicture">
      </div>
    </div>
  </div>
  <br>
</div>
<div class="allBoxes">
  <div class="container">
    <div class="summary-row">
      <div class="summary-card">
        <h2>Account Level</h2>
        <p id="accountLevelDisplay"></p>
      </div>
      <div class="summary-card">
        <h2>Computer Science A</h2>
        <p id="csaPointDisplay"></p>
      </div>
      <div class="summary-card">
        <h2>Computer Science P</h2>
        <p id="cspPointDisplay"></p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="summary-row">
      <div class="summary-card">
        <box-icon name='code'></box-icon>
        <h2>Summary Card 2</h2>
        <p>Text content for card 2</p>
      </div>
      <div class="summary-card">
        <box-icon name='code'></box-icon>
        <h2>Summary Card 3</h2>
        <p>Text content for card 3</p>
      </div>
    </div>
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

      fetch("http://localhost:8032/api/person/jwt", requestOptions)
      // fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/jwt", requestOptions)
        .then(response => {
                if (!response.ok) {
                    const errorMsg = 'Login error: ' + response.status;
                    console.log(errorMsg);

                    switch (response.status) {
                        case 401:
                            alert("Please log into or make an account");
                            // window.location.href = "login";
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
          changeProfileText.innerHTML = "Change Profile";
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

  function signOut() {
    console.log("signout called")
    document.cookie = "jwt" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
  }

</script>