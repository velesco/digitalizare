// elements
const askGpt = document.getElementById('askGPT');
const chatBox = document.getElementById('chatBox');


// functions

// acces API with question
function renderAnswer(question) {
    fetch('http://3.75.177.131:3000/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'quest': question
        })
    })
        // SERVER RESPONSE
        .then((result) => {
            if (result.status != 200) { throw new Error("Bad Server Response"); }
            return result.text();
        })
        .then((response) => {
            ansText = response;
            console.log(ansText);

            // all html rendering goes here
            removeLoading();
            addMessage('left',ansText)
            chatBox.scrollTop = chatBox.scrollHeight;


        })
        .catch(error => console.log(error));
}

// add answer loading animation
function addLoading() {
    const loadingChild = document.createElement('div');
    loadingChild.classList = 'chat-content-leftside';
    loadingChild.id = 'loading-child'
    loadingChild.innerHTML = `
        <div class="d-flex">
            <div class="flex-grow-1 ms-2">
                <p class="mb-0 chat-time">Tasteaza...</p>
            </div>
        </div>
    `;
    chatBox.appendChild(loadingChild);
    askGpt.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
};

// remove answer loading animation
function removeLoading() {
    const loadingChild = document.getElementById('loading-child');
    loadingChild.remove()

}

// add message in chat
function addMessage(msgLoc,msgText) {
    const msgChild = document.createElement('div');
    msgChild.classList = `chat-content-${msgLoc}side`;

    if (msgLoc === 'right') {
        msgChild.innerHTML = `
            <div class="d-flex">
                <div class="flex-grow-1 me-2">
                    <p class="chat-right-msg">${msgText}</p>
                </div>
            </div>
        `;
    } else {
        msgChild.innerHTML = `
            <div class="d-flex">
                <img src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" width="48" height="48" class="rounded-circle" alt="" />
                <div class="flex-grow-1 ms-2">
                    <p class="chat-left-msg">${msgText}</p>
                </div>
            </div>
        `;
    }
    chatBox.appendChild(msgChild);
};

// run when user press enter on chat input box
askGpt.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log('asked GPT: ' + askGpt.value);
        renderAnswer(askGpt.value);
        addMessage('right',askGpt.value)
        addLoading();
    }
});



