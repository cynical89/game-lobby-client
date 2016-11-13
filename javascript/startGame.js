 var execFile = require("child_process").execFile;
var config = require("./config.json");

$("#startButton").on("click", function(e) {
	e.preventDefault();
	console.log("pressed button");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: `${config.site.apiHost}:${config.site.port}/game/newGame`
	}).done(function(result) {
		if (result.error === true) {
			alert(result.message);
			return console.error(result.message);
		}
		// do something with the success, like show a link
		console.log(result);
		startGame(result.id);
	}).fail(function(err) {
		// do something with the failure, like laugh at the user
		window.alert("hahahahaha! NO!");
		console.error(err);
	});
});

// this function calls our executable with an argument to pass the game ID
function startGame(id) {
	var path = "./bin/game";
	var args = "--args-g:";
	if (process.platform === "linux") {
		path = `${path}.x86_64`;
	}
	if (process.platform === "darwin") {
		path = "bin/game.app/Contents/MacOS/game";
	}

	execFile(path, [`${args}${id}`], function(err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data.toString());
		}
	});
}
