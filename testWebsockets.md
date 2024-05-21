---
search_exclude: true
--- 


<button onclick="runSocket()">test websocket</button>

<script>
    function runSocket() {
        const ws1 = new WebSocket("wss://codemaxxerlink.stu.nighthawkcodingsociety.com/myhandler");

        ws1.onopen = () => {
            ws1.send("register:Player1;15;100"); // Register Player1 with attack 15 and health 100
        };

        ws1.onmessage = (event) => {
            console.log("Player1:", event.data);
        };
    }

</script>