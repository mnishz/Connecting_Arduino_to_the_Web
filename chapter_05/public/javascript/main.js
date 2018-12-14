(function() {
    const socket = io();

    const redBlock = document.getElementById("red-block")
    const greenBlock = document.getElementById("green-block")

    redBlock.addEventListener("click", function() {
        const redClick = redBlock.classList.toggle("red-block-on");
        socket.emit('red', redClick + "_red");
    });

    greenBlock.addEventListener("click", function() {
        const greenClick = greenBlock.classList.toggle("green-block-on");
        socket.emit('green', greenClick + "_green");
    });
})();
