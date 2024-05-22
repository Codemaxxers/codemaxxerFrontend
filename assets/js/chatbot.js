const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const waitingSpinner = getById("waiting");
const deleteChat = getById("delete_chat");
const retieveChatHistory = getById("retieve_chat_history");

const chatUrl = "http://localhost:8032/aichatbot/chat?message=";
const clearHistUrl = "http://localhost:8032/aichatbot/chat/history/clear";
const retrieveHistUrl = "http://localhost:8032/aichatbot/chat/history";

const BOT_IMG = "assets/icons/icons8-chat-bot-64.png";
const PERSON_IMG = "assets/icons/icons8-person-94.png";
const BOT_NAME = "Chat Bot";
const PERSON_NAME = "You";

const BOT_TITLE = "AI Bot";
const PERSON_TITLE = "You";

deleteChat.addEventListener("click", async (event) => {
  event.preventDefault();
  await deleteData(clearHistUrl);
  msgerChat.innerHTML = "";
  appendMessage(BOT_NAME, BOT_IMG, "left", "Your chat history has been cleared! Go ahead and send me a new message. 😄", BOT_TITLE);
});

retieveChatHistory.addEventListener("click", async (event) => {
  event.preventDefault();
  const chatHistory = await getData(retrieveHistUrl);
  const chatJson = JSON.parse(chatHistory);
  const chats = chatJson.chats;
  for (let i = 0; i < chats.length; i++) {
    const chatJsonTemp = chats[i];
    const cResponse = chatJsonTemp.chat_response;
    const cMessage = chatJsonTemp.chat_message;
    appendMessage(PERSON_NAME, PERSON_IMG, "right", cMessage, PERSON_TITLE);
    appendMessage(BOT_NAME, BOT_IMG, "left", cResponse, BOT_TITLE);
  }
});

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText, PERSON_TITLE);
  msgerInput.value = "";
  waitingSpinner.style.display = "";
  botResponse(msgText);
});

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

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

async function botResponse(msgText) {
  let reqUrl = chatUrl + encodeURIComponent(msgText);

  const response = await fetch(reqUrl);
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let partialMessage = "";
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value, { stream: true });
    partialMessage += chunk;
    updateBotMessage(partialMessage);
  }

  updateBotMessage(partialMessage, true);
  waitingSpinner.style.display = "none";
}

function updateBotMessage(text, isFinal = false) {
  const botMessages = msgerChat.querySelectorAll(".left-msg .msg-text");
  if (botMessages.length === 0 || isFinal) {
    appendMessage(BOT_NAME, BOT_IMG, "left", text, BOT_TITLE);
  } else {
    botMessages[botMessages.length - 1].innerHTML = text;
  }
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function getById(eleid, root = document) {
  return root.getElementById(eleid);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

async function deleteData(url = "") {
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  });
  return response.text();
}

async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  });
  return response.text();
}
