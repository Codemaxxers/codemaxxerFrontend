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
      <h3 id="detailText">Game Statistics</h3>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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


 <div>
        <canvas id="pointsChart" width="400" height="200"></canvas>
    </div>

  <div>
        <label for="csaPointsSlider">CSA Points</label>
        <input type="range" id="csaPointsSlider" min="0" max="100" step="1" value="50">
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

                    predictAPScore(data.csaPoints);
                })
                .catch(error => console.log('error', error));
        }
        // Ignore

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
            // Ensure the predicted AP score is between 1 and 5
            const predictedAPScore = Math.min(Math.max(Math.round(data), 1), 5);
            document.getElementById("predictedAPScoreDisplay").innerText = `Predicted AP Score: ${predictedAPScore}`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById("predictedAPScoreDisplay").innerText = 'Failed to fetch prediction result.';
        });
}

    </script>

  <script>
        // Dummy data for initial points
        let accountPoints = 70;
        let csaPoints = 50;
        let cspPoints = 80;

        // Initialize Chart.js bar chart
        let ctx = document.getElementById('pointsChart').getContext('2d');
        let pointsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Account Points', 'CSA Points', 'CSP Points'],
                datasets: [{
                    label: 'Points',
                    data: [accountPoints, csaPoints, cspPoints],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Event listener for CSA Points slider
        document.getElementById('csaPointsSlider').addEventListener('input', function(event) {
            csaPoints = parseInt(event.target.value);
            updatePointsChart();
            predictAPScore();
        });

        // Function to update the bar chart with new points
        function updatePointsChart() {
            pointsChart.data.datasets[0].data[1] = csaPoints;
            pointsChart.update();
        }

        // Function to predict AP Score
        function predictAPScore() {
            // Dummy logic for predicting AP score based on CSA points
            let predictedAPScore = Math.max(Math.min(Math.round(csaPoints / 10), 5), 1);
            console.log('Predicted AP Score:', predictedAPScore);
        }

        // Initial prediction of AP score
        predictAPScore();
    </script>