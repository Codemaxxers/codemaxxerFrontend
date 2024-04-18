---
layout: none
permalink: /phishing
---

<!-- <div style="border: 2px solid black; border-radius: 20px; padding: 20px;"> -->

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root {
      --pastel-pink: #ffb6c1;
      --dark-pink: #ff69b4;
      --purple: #9b30ff;
      --blue: #4169e1;
      --black: #000000;
      --green: #90EE90;
      --red: #ffb6c1;
      --gray: #A9A9A9;
      --font-family: 'Comic Sans MS', cursive, sans-serif;
    }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Set the height of the body to full viewport height */
      margin: 0; /* Remove default margin */
      background-color: var(--white); /* White background */
      color: var(--black); /* Black text */
      font-family: var(--font-family);
    }
    #game-container {
      margin: 50px;
      text-align: center; /* Center align text */
      max-width: 600px;
    }
    #result {
      font-weight: bold;
      margin-top: 20px;
      color: var(--dark-pink); /* Dark pink text */
    }
    #email-text {
      color: var(--gray); /* Dark pink text */
      text-align: center; /* Align email text to the left */
    }
    .button-legitimate {
      padding: .5rem 2rem;
      color: var(--white);
      background-color: var(--blue);
      border-radius: 5px;
      border: 2px solid black;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
     .button-phishing {
      padding: .5rem 2rem;
      color: var(--white);
      background-color: var(--pastel-pink);
      border-radius: 5px;
      border: 2px solid black;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .button-legitimate:hover {
      background-color: var(--blue);
    }
     .button-phishing:hover {
      background-color: var(--blue);
    }
  </style>
</head>
<body id="body">
<div id="game-container" style="border: none; border-radius: 20px; padding: 20px; background-color: white;">
  <div id="content-container">
    <h1>Email Phishing Game</h1>
    <br>
    <br>
    <p id="email-text"></p>
    <br>
    <br>
    <button class="button-legitimate" onclick="checkAnswer(true)">Legitimate Email</button>
    <button class="button-phishing" onclick="checkAnswer(false)">Phishing Email</button>
    <br>
    <br>
    <p id="result"></p>
  </div>
</div>


<script>
  const emails = [
    {
      text: "Dear Beloved Friend, I know this message will come to you as surprised but permit me of my desire to go into business relationship with you. I am Miss Naomi Surugaba a daughter to late Al-badari Surugaba of Libya whom was murdered during the recent civil war in Libya in March 2011, before his death my late father was a strong supporter and a member of late Moammar Gadhafi Government in Tripoli. Meanwhile before the incident, my late Father came to Cotonou Benin republic with the sum of USD4, 200,000.00 (US$4.2M) which he deposited in a Bank here in Cotonou Benin Republic West Africa for safe keeping. I am here seeking for an avenue to transfer the fund to you in only you're reliable and trustworthy person to Investment the fund. I am here in Benin Republic because of the death of my parent's and I want you to help me transfer the fund into your bank account for investment purpose. Please I will offer you 20% of the total sum of USD4.2M for your assistance. Please I wish to transfer the fund urgently without delay into your account and also wish to relocate to your country due to the poor condition in Benin, as to enable me continue my education as I was a medical student before the sudden death of my parent's. Reply to my alternative email:missnaomisurugaba2@hotmail.com, Your immediate response would be appreciated.",
      isLegitimate: false
    },
    {
      text: "Hello user, your recent purchase has been confirmed. If you did not make this purchase, please contact us immediately.",
      isLegitimate: true
    },
    {
      text: "URGENT: Your account will be suspended unless you verify your information. Click the link to proceed: https://fakephishingsite.com/verify",
      isLegitimate: false
    },
    {
      text: "Dear customer, thank you for your recent order. Here is your order confirmation: Order #123456",
      isLegitimate: true
    },
    {
      text: "Thanks for working with us. Your bill for $373.75 was due on 28 Aug 2016. If you've already paid it, please ignore this email and sorry for bothering you. If you've not paid it, please do so as soon as possible. To view your bill visit https://in.xero.com/5LQDhRwfvoQfeDtLDMqkk1JWSqC4Cm.Jt4VVJRsGN. If you've got any questions, or want to arrange alternative payment don't hesitate to get in touch. Thanks, NJW Limited",
      isLegitimate: false
    },
    {
      text: "Congratulations! You've won a prize. Click the link to claim: https://amazon.com/winner",
      isLegitimate: false
    },
    {
      text: "Important update: Your software requires an immediate update. Click the link to download: https://legitsoftwaredownload.com",
      isLegitimate: true
    },
    {
      text: "Account notification: Your account has been logged in from a new device. Verify your identity: https://fakephishingsite.com/verify",
      isLegitimate: false
    },
    {
      text: "Invoice: Your recent payment is successful. Here is your invoice: Invoice #789012",
      isLegitimate: true
    },
    {
      text: "Security Notice: Your password has expired. Click the link to change it: https://fakephishingsite.com/changepassword",
      isLegitimate: false
    }
  ];
  let currentLevel = 0;
  let correctAnswers = 0;
  // Function to shuffle the emails array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // Shuffle the emails array
  shuffle(emails);

  function startGame() {
    if (currentLevel < 5) {
      document.getElementById("email-text").textContent = emails[currentLevel].text;
    } else {
      endGame();
    }
  }
  function checkAnswer(userResponse) {
    if (emails[currentLevel].isLegitimate === userResponse) {
      correctAnswers++;
      document.getElementById("body").style.backgroundColor = "lightgreen"; // Change background color to light green
    }

    // Set timeout to revert background color to white after 2 seconds
      setTimeout(function() {
        document.getElementById("body").style.backgroundColor = "white";
      }, 3000);

    currentLevel++;
    document.getElementById("result").textContent = "";
    startGame();
  }
  function endGame() {
    document.getElementById("game-container").innerHTML = `
      <h1>Game Over!</h1>
      <p>You completed the game with ${correctAnswers} correct answers out of 5 questions.</p>
    `;
  }
  // Start the game
  startGame();

  console.log(correctAnswers);
  
</script>
