---
layout: star
search_exclude: true
permalink: signup
--- 

<body>
    <div class="banner">
        <div class="navbar">
            <img src="images/RIFTlogo.png" class="logo">
            <ul>
                <li><a href="{{site.baseurl}}/">Home</a></li>
                <li><a href="">Info</a></li>
                <li><a href="">Player Search</a></li>
                <li><a href="">About Us</a></li>
            </ul>
        </div>
    </div>
</body>

<div class="card">
    <h3 id="signUpText">Sign Up</h3>
    <h5>Email</h5>
    <input>
    <br>    
    <h5>Username</h5>
    <input>
    <br>    
    <h5>Password</h5>
    <input>
    <br>
    <br>
    <button>Sign Up</button>
</div>

<style>
    #signUpText {
        font-size: 2em;
        margin-bottom: 10px
    }

    .page-content {
        padding: 0px !important;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }


    .navbar {
        width: 85%;
        margin: auto;
        padding: 35px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        width: 120px !important;
        height: auto !important;
    }

    .navbar ul li{
        list-style: none;
        display: inline-block;
        margin: 0 20px;
        position: relative;
    }

    .navbar ul li a{
        font-size: 16px;
        text-decoration: none;
        color: #fff;
        text-transform: uppercase;
    }

    .navbar ul li::after{
        content: '';
        height: 3px;
        width: 0;
        background: #2f80d0;
        position: absolute;
        left: 0;
        bottom: -10px;
        transition: ease-out .5s;
    }

    .navbar ul li:hover::after{
        width: 100%;
    }

    p {
        text-align: left;
        font-size: 1.1em;
        font-weight: bold;
        color: #000000;
    }
</style>

<script>

       function signUp() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": document.getElementById("emailInput").value,
            "password": document.getElementById("passwordInput").value

            // For quick testing
            //"email": "toby@gmail.com",
            //"password": "123Toby!"
        });
        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            credentials: 'include',  // Include this line for cross-origin requests with credentials
            body: raw,
            redirect: 'follow'
        };

        // LOCAL TESTING
        // fetch("http://localhost:8032/authenticate", requestOptions)
        fetch("https://codemaxxers.stu.nighthawkcodingsociety.com/api/person/post?email=yuh@gmail.com&password=123Yuh!&name=Yuh", requestOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);

                switch (response.status) {
                    case 401:
                        alert("Incorrect username or password");
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
            return response.text()
        })
        .then(result => {
            console.log(result);
            window.location.href = "dashboard";
        })
        .catch(error => console.error('Error during login:', error));
    }
</script>