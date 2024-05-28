document.addEventListener("DOMContentLoaded", function() {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socketUrl = `${wsProtocol}//codemaxxers.stu.nighthawkcodingsociety.com/myhandler`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = function() {
        console.log('Connected');
    };

    socket.onmessage = function(event) {
        showMessageOutput(event.data);
    };

    function sendMessage() {
        const messageInput = document.getElementById('messageInput').value;
        const message = JSON.stringify({ command: 'hello', params: messageInput });
        socket.send(message);
    }

    function showMessageOutput(messageOutput) {
        const response = document.getElementById('messages');
        const p = document.createElement('p');
        p.style.wordWrap = 'break-word';
        p.appendChild(document.createTextNode(messageOutput));
        response.appendChild(p);
    }

    window.sendMessage = sendMessage; // Make sendMessage available globally
});
