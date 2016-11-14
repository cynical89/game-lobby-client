"use strict";

const socket = require("socket.io-client");
const config = require("../config.json");

const io = socket.connect(`${config.site.apiHost}:${config.site.port}`);

io.once("connect", () => {
	console.log("Client connected!");
});

$("form").submit(() => {
	io.emit("chat message", $("#m").val());
	$("#m").val("");
	return false;
});
io.on("chat message", (msg) => {
	$("#messages").append($("<li>").text(msg));
});
