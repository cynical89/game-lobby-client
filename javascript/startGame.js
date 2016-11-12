var execFile = require("child_process").execFile;

var gameID = "TEST-GAME-ID"

$("#startButton").on("click", function() {
	console.log("pressed button");
	execFile("./bin/game", [`-g ${gameID}`], function(err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data.toString());
		}
	});
});
