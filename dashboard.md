---
layout: profile
search_exclude: true
--- 

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