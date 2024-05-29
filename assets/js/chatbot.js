// Define and select essential elements from the DOM for interaction
const elements = {
  form: document.querySelector(".msger-inputarea"), // The form where users input their messages
  input: document.querySelector(".msger-input"), // The text input field within the form
  chat: document.querySelector(".msger-chat"), // The chat display area
  spinner: document.getElementById("waiting"), // A loading spinner element
  deleteChat: document.getElementById("delete_chat"), // The button to delete chat history
  retrieveChatHistory: document.getElementById("retieve_chat_history"), // The button to retrieve chat history
};

// Define URLs for various API endpoints
const urls = {
  chat: "http://localhost:8032/aichatbot/chat?message=", // Endpoint for sending a chat message
  clearHistory: "http://localhost:8032/aichatbot/chat/history/clear", // Endpoint for clearing chat history
  retrieveHistory: "http://localhost:8032/aichatbot/chat/history" // Endpoint for retrieving chat history
  
  //Example alternative URLs (commented out)
//  chat: "https://codemaxxers.stu.nighthawkcodingsociety.com/aichatbot/chat?message=",
//  clearHistory: "https://codemaxxers.stu.nighthawkcodingsociety.com/aichatbot/chat/history/clear",
//  retrieveHistory: "https://codemaxxers.stu.nighthawkcodingsociety.com/aichatbot/chat/history",
};

// Define assets such as images and names for the bot and user
const assets = {
  botImg: "assets/icons/icons8-chat-bot-64.png", // Bot image icon
  personImg: "assets/icons/icons8-person-94.png", // User image icon
  botName: "Chat Bot", // Bot name
  personName: "You", // User name
  botTitle: "AI Bot", // Bot title for image tooltip
  personTitle: "You", // User title for image tooltip
};

// Event listener for the delete chat button
elements.deleteChat.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission
  await fetchData(urls.clearHistory, "DELETE"); // Send a DELETE request to clear chat history
  elements.chat.innerHTML = ""; // Clear the chat display area
  appendMessage(assets.botName, assets.botImg, "left", "Your chat history has been cleared! Go ahead and send me a new message. 😄", assets.botTitle); // Inform the user that the chat history is cleared
});

// Event listener for the retrieve chat history button
elements.retrieveChatHistory.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const chatHistory = await fetchData(urls.retrieveHistory); // Fetch chat history
  const chats = JSON.parse(chatHistory).chats; // Parse the chat history
  chats.forEach(chat => { // Loop through each chat message
    appendMessage(assets.personName, assets.personImg, "right", chat.chat_message, assets.personTitle); // Append user's message
    appendMessage(assets.botName, assets.botImg, "left", chat.chat_response, assets.botTitle); // Append bot's response
  });
});


// State variable to keep track of the current response function
let useSecondBotResponse = false;

// Event listener for the toggle button
document.getElementById("toggle-response-btn").addEventListener("click", () => {
  useSecondBotResponse = !useSecondBotResponse;
  alert(`Using ${useSecondBotResponse ? "instant chat" : "streamed chat"}`);
});



// Event listener for form submission (sending a new message)
elements.form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission
  const msgText = elements.input.value; // Get the message text from the input field
  if (!msgText) return; // Do nothing if the input field is empty
  appendMessage(assets.personName, assets.personImg, "right", msgText, assets.personTitle); // Append the user's message to the chat
  elements.input.value = ""; // Clear the input field
  elements.spinner.style.display = ""; // Display the loading spinner)
  if (useSecondBotResponse)  {
    secondbotResponse(msgText); // Send the message to the second bot response
  } else {
    botResponse(msgText); // Send the message to the bot
  }});

// Function to append a message to the chat display area
function appendMessage(name, img, side, text, title) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})" title="${title}"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  elements.chat.insertAdjacentHTML("beforeend", msgHTML); // Insert the message HTML into the chat display area
  elements.chat.scrollTop += 500; // Scroll to the bottom of the chat display area
}


async function secondbotResponse(msgText) {
  const data = await fetchData(`${urls.chat}${msgText}`); // Fetch the bot's response
  appendMessage(assets.botName, assets.botImg, "left", data, assets.botTitle); // Append the bot's response to the chat
  elements.spinner.style.display = "none"; // Hide the loading spinner
}

// Function to handle bot responses
async function botResponse(msgText) {
  // Show the loading spinner
  elements.spinner.style.display = "block";

  // Fetch the bot's response
  const data = await fetchData(`${urls.chat}${msgText}`);

  // Function to split the data into smaller chunks
  function* chunkString(str, size) {
    for (let i = 0; i < str.length; i += size) {
      yield str.slice(i, i + size);
    }
  }

  // Split the response into chunks of a specified size (e.g., 10 characters)
  const chunks = Array.from(chunkString(data, 10));

  // Create a single message container for the response
  appendMessage(assets.botName, assets.botImg, "left", "", assets.botTitle);

  // Get the newly created message element
  const lastMsgTextElement = elements.chat.querySelector(".msg.left-msg:last-child .msg-text");

  // Function to append the next chunk
  let currentChunk = 0;
  function appendNextChunk() {
    if (currentChunk < chunks.length) {
      lastMsgTextElement.innerHTML += chunks[currentChunk];
      currentChunk++;
      elements.chat.scrollTop += 500; // Ensure the chat scrolls to show the latest content
    } else {
      // Stop the interval when all chunks are appended
      clearInterval(intervalId);
      // Hide the loading spinner
      elements.spinner.style.display = "none";
    }
  }

  // Set an interval to append chunks at specified intervals (e.g., every 100 milliseconds)
  const intervalId = setInterval(appendNextChunk, 100);
}



// Function to format the date/time for messages
function formatDate(date) {
  const h = String(date.getHours()).padStart(2, "0"); // Get hours with leading zero
  const m = String(date.getMinutes()).padStart(2, "0"); // Get minutes with leading zero
  return `${h}:${m}`; // Return formatted time
}

// Function to fetch data from the API
async function fetchData(url, method = "GET", data = null) {
  const options = {
    method, // HTTP method (GET, POST, DELETE, etc.)
    headers: { "Content-Type": "application/json" }, // Headers for the request
    mode: "cors", // Cross-origin resource sharing
    cache: "no-cache", // No caching
    credentials: "same-origin", // Same-origin credentials
    redirect: "follow", // Follow redirects
    referrerPolicy: "no-referrer", // No referrer policy
  };
  if (data) options.body = JSON.stringify(data); // Add body data if provided
  const response = await fetch(url, options); // Fetch data from the API
  console.log(response); // Log the response for debugging
  return response.text(); // Return the response text
}
