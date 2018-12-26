(function() {
    const socket = io();
// extending    var totalClickCounter = 0;
// extending    var accumelatorArrayA0 = [0,0,0,0,0,0,0,0,0,0,0];
// extending    var accumelatorArrayA1 = [0,0,0,0,0,0,0,0,0,0,0];

    socket.on("bar-data", function(data) {
        const current = data.dataKey;
        const svgBar = document.getElementById(current);
        const newWidth = data.dataString * 40;
        svgBar.setAttribute("width", newWidth);
        currentInputValue(data);
        addRemoveClass("add");
    });

    socket.on("button-data", function(data) {
// extending        var percetageSpan = document.getElementById('percent');
// extending        totalClickCounter = totalClickCounter + 2;
// extending        accumelatorArrayA0[data[0]] = accumelatorArrayA0[data[0]] + 1;
// extending        accumelatorArrayA1[data[1]] = accumelatorArrayA1[data[1]] + 1;
// extending        var positiveTotal1 = sumPositiveResponses(accumulatorArrayA0);
// extending        var positiveTotal2 = sumPositiveResponses(accumulatorArrayA1);
// extending        var positiveTotals = positiveTotal1 + positiveTotal2;
// extending        var positivePercentage = (positiveTotals / totalClickCounter) * 100;
// extending        percent.innerHTML = Math.floor(positivePercentage);
// visualizing        positivePercentage = Math.floor(positivePercentage);
// visualizing        percent.innterHTML = positivePercentage;
// visualizing        socket.emit('percentData', positivePercentage);
        addRemoveClass("remove");
    });

// extending    function sumPositiveResponses(dataArray) {
// extending        var positiveTotal = 0;
// extending        for (var i = 5; i < dataArray.length; i++) {
// extending            positiveTotal = positiveTotal + dataArray[i];
// extending        }
// extending        return positiveTotal;
// extending    }

    function addRemoveClass(action) {
        var buttonResponse = document.getElementById("bar-A0").getElementsByClassName("text-block-response")[0];
        buttonResponse.classList[action]("hidden");
        buttonResponse = document.getElementById("bar-A1").getElementsByClassName("text-block-response")[0];
        buttonResponse.classList[action]("hidden");
    }

    function currentInputValue(data) {
        const targetP = document.getElementById("bar-" + data.dataKey).getElementsByClassName("text-block")[0].getElementsByTagName("p")[0];
        targetP.innerHTML = data.dataString;
    }
});
