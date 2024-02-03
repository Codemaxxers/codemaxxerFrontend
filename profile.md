---
layout: profile
search_exclude: true
--- 

<style>
    .container-profile {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      margin-left: 300px;
    }

    .account-card {
      background-color: #2f80d0;
    }

    .container-profile {
      height: 20vh; /* 20% of the viewport height */
      /* background-color: #141c2d; Add your preferred background color */
    }

    #initName {
      margin-left: 20px;
    }
</style>

<div class="container-profile">
  <div class="summary-row">
    <h1 id="initName"></h1>
    <div class="account-card">
      <div id="profilePicture">
      </div>
    </div>
  </div>
</div>
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

      // fetch("http://localhost:8032/api/person/jwt", requestOptions)
      fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/jwt", requestOptions)
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
          imgElement.style.width = "50px";
          imgElement.style.height = "50px";
          imgElement.style.float = "left";
          profilePictureDiv.appendChild(imgElement);

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