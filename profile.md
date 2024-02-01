---
layout: profile
search_exclude: true
--- 

<style>
    body {
        background: #272423;
    }
    .container-name {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      margin-left: 300px;
  }
    
</style>

<div class="container-name">
  <div class="summary-row">
    <h1 id="initName"></h1>
  </div>
</div>
<div class="container">
  <div class="summary-row">
    <div class="summary-card">
      <h2>Summary Card 1</h2>
      <p>Text content for card 1</p>
      <!-- <img src="icon1.png" alt="Icon 1"> -->
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

      fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/jwt", requestOptions)
        .then(response => {
                if (!response.ok) {
                    const errorMsg = 'Login error: ' + response.status;
                    console.log(errorMsg);

                    switch (response.status) {
                        case 401:
                            alert("Please log into or make an account");
                            // window.location.href = "/codemaxxerFrontend/login";
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
          // Display user data above the table
          // const userDataContainer = document.getElementById("userData");
          // userDataContainer.innerHTML = `
          //   <img src="/Login-Lesson/images/defaultUser.png" width="250" height="250">
          //   <h1><strong>${data.name}</strong></h1>
          //   <p>Email: ${data.email}</p>
          //   <p>Age: ${data.age}</p>
          //   <p>ID: ${data.id}</p>
          //   <button onclick="signOut()">Sign Out</button>
          // `;

          // First name and side bar instantiation
          const fullNameArray = data.name.split(' ');
          const firstName = fullNameArray[0];
          document.getElementById("initName").innerHTML = "Welcome back, " + firstName;
          document.getElementById("sidebarName").innerHTML = data.name;
          console.log(data);
        })
        .catch(error => console.log('error', error));
  }

</script>