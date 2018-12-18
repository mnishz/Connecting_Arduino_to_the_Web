(function() {
    const socket = io();

    const sendTextButton = document.getElementById("send-text");

    sendTextButton.addEventListener("click", function() {
        const sendText = document.getElementById("input-text").value;
        socket.emit('input-text', sendText);
    });
})();
