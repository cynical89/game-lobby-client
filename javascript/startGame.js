"use strict";

const execFile = require("child_process").execFile;
const config = require("./config.json");

$("#startButton").on("click", (e) => {
	e.preventDefault();
	console.log("pressed button");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: `${config.site.apiHost}:${config.site.port}/game/newGame`
	}).done((result) => {
		if (result.error === true) {
			alert(result.message);
			return console.error(result.message);
		}
		// do something with the success, like show a link
		console.log(result);
		startGame(result.id);
	}).fail((err) => {
		// do something with the failure, like laugh at the user
		window.alert("hahahahaha! NO!");
		console.error(err);
	});
});

// this function calls our executable with an argument to pass the game ID
function startGame(id) {
	let path = "./bin/game";
	const args = "--args-g:";
	if (process.platform === "linux") {
		path = `${path}.x86_64`;
	}
	if (process.platform === "darwin") {
		path = "bin/game.app/Contents/MacOS/game";
	}

	execFile(path, [`${args}${id}`], (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data.toString());
		}
	});
}
