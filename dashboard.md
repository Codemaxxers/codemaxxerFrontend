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

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .container-profile,
  .allBoxes,
  .container {
    animation: fade-in 1s ease-in-out; /* Apply fade-in animation */
  }

  /* Styling for the slider */
  .slider-container {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    padding-top: 20px;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 20px;
    border-radius: 10px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider:hover {
    opacity: 1;
  }

  /* Styling for slider value display */
  .slider-value {
    padding-top: 10px;
    font-size: 18px;
  }

  /* Styling for prediction display */
  .prediction-container {
    padding-top: 20px;
    text-align: center;
    font-size: 18px;
  }

  /* Styling for progress bar */
  .progress-bar {
    width: 50%;
    margin: 20px auto;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 5px;
    overflow: hidden;
  }

  .progress {
    width: 0;
    height: 100%;
    background-color: #4caf50;
    text-align: center;
    line-height: 30px;
    color: white;
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
        <p id="accountPointsDisplay">Loading...</p>
        <p id="accountPointsDisplay">Loading...</p>
      </div>
      <div class="summary-card">
        <h2>Computer Science A</h2>
        <p id="csaPointsDisplay">Loading...</p>
      </div>
      <div class="summary-card">
        <h2>Computer Science P</h2>
        <p id="cspPointsDisplay">Loading...</p>
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

<!-- Script for dynamic functionality -->
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
        document.getElementById("initName").innerText = data.name;
        document.getElementById("accountPointsDisplay").innerText = data.accountPoints + " Points";
        document.getElementById("csaPointsDisplay").innerText = data.csaPoints + " Points";
        document.getElementById("cspPointsDisplay").innerText = data.cspPoints + " Points";

        // Initialize slider value with accessed CSA points
        const initialCSAPoints = data.csaPoints;
        document.getElementById('csaPointsSlider').value = initialCSAPoints;
        document.getElementById('sliderValue').innerText = `CSA Points: ${initialCSAPoints}`;

        predictAPScore(initialCSAPoints);
      })
      .catch(error => console.log('error', error));
  }

  function predictAPScore(csaPoints) {
    console.log("Sending request with csaPoints:", csaPoints);
    fetch("http://localhost:8032/api/predictAPScore?csaPoints=" + csaPoints)
      .then(response => {
        console.log("Received response:", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);
        const predictedAPScore = Math.round(data);
        document.getElementById('predictedAPScoreDisplay').innerText = `Predicted AP Score: ${predictedAPScore}`;
        // Populate the prediction container
        document.getElementById('predictionContainer').innerText = `Predicted AP Score: ${predictedAPScore}`;
        // Update progress bar
        document.getElementById('predictedAPProgress').innerText = `Predicted AP Score: ${predictedAPScore}`;
        document.getElementById('predictedAPProgress').style.width = predictedAPScore + "%";
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('predictedAPScoreDisplay').innerText = 'Failed to fetch prediction result.';
      });
  }

  // Event listener for slider input
  document.getElementById('csaPointsSlider').addEventListener('input', function(event) {
    const sliderPoints = event.target.value;
    document.getElementById('sliderValue').innerText = `CSA Points: ${sliderPoints}`;
    predictAPScore(sliderPoints);
  });
</script>
