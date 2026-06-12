const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addUserMessage(message) {

    const div = document.createElement("div");

    div.className = "user-message";

    div.innerText = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(message) {

    const div = document.createElement("div");

    div.className = "bot-message";

    div.innerText = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async function () {

    const message = userInput.value.trim();

    if (message === "") {

        return;

    }

    addUserMessage(message);

    userInput.value = "";

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message: message

            })

        });

        const data = await response.json();

        addBotMessage(data.response);

    }

    catch (error) {

        addBotMessage("Error connecting to server.");

        console.error(error);

    }

});

userInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        sendBtn.click();

    }

});