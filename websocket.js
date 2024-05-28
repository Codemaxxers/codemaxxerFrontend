document.addEventListener("DOMContentLoaded", function() {
    const socket = new SockJS('https://codemaxxers.stu.nighthawkcodingsociety.com/myhandler');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (messageOutput) {
            showMessageOutput(messageOutput.body);
        });
    });

    function sendMessage() {
        const messageInput = document.getElementById('messageInput').value;
        stompClient.send("/app/hello", {}, messageInput);
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
