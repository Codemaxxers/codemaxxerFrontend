---
layout: profile
search_exclude: true
--- 

<style>
  .account-card {
    width: 300px; /* Adjust width as needed */
    padding: 20px;
    background-color: #E5E4E2;
    border-radius: 10px;
    margin-left: 78%; /* Adjust margin to match sidebar width */
    text-align: center;
    margin-bottom: 20px; /* Adjust bottom margin as needed */
    position: absolute;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(230,151,8,1) 0%, rgba(255,0,0,1) 100%);
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
        <h2>Account Points</h2>
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
<div class="container">
      <div class="summary-row">
        <div class="summary-card">
          <h2>Predicted AP Score</h2>
          <!-- Placeholder for the predicted AP Score -->
          <p id="predictedAPScoreDisplay">Predicted AP Score will appear here</p>
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
      fetch("http://localhost:8032/api/person/jwt", requestOptions)
      // fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/jwt", requestOptions)
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
          // Fetched user data successfully

          // Pass the user data to the prediction model
          predictAPScore(data.csaPoints);
        })
        .catch(error => console.log('error', error));
  }

  // Prediction model function
  function predictAPScore(csaPoints) {
      // Make a fetch request to your backend or invoke your backend API
      fetch("http://localhost:8032/api/predictAPScore?csaPoints=" + csaPoints)
      // fetch("https://your-backend-url.com/api/predictAPScore?csaPoints=" + csaPoints)
        .then(response => response.json())
        // Inside the predictAPScore function after receiving the predicted AP Score
        .then(data => {
            // Display the predicted AP Score
            console.log("Predicted AP Score: " + data.predictedAPScore);
            // Update the placeholder element with the predicted AP Score
            document.getElementById("predictedAPScoreDisplay").innerHTML = "Predicted AP Score: " + data.predictedAPScore;
        })

  }
</script>
