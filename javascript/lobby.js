"use strict";

const socket = require("socket.io-client");
const config = require("../config.json");
const send = require("../notifications/notify");

let user;
let button;
let recipient;

const io = socket.connect(`${config.site.apiHost}:${config.site.port}`);

io.once("connect", () => {
	console.log("Client connected to chat!");
	io.emit("updateSocket", { user: user.username, socket: io.io.engine.id });
});

io.on("getUserMessage", (data) => {
	send.messageNotify(data.user, data.message);
});

$("#exampleModal").on("show.bs.modal", (event) => {
	button = $(event.relatedTarget);
	recipient = button.data("whatever");
	const modal = $(this);
	$("#exampleModalLabel").text(`New message to ${recipient}`);
	$("#recipient-name").val(recipient);
});

$("#send-message").on("click", () => {
	const msg = $("#message-text").val();
	io.emit("messageUser", { to: recipient, from: user.username, message: msg });
});

$(document).ready(() => {
	getUserInfo();
	$("#placeholder").on("click", "#messageUser", (e) => {
		send.messageNotify(user.username, "testing");
	});
});

$("#menu-toggle").on("click", (e) => {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});

function getUserInfo() {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: `${config.site.apiHost}:${config.site.port}/userinfo`
	}).done((result) => {
		if (result.error === true) {
			alert(result.message);
			return console.error(result.message);
		}
		// do something with the success, like show a link
		console.log(result);
		user = result;
		$("#userInfo").html(result.username);
		if (result.friends.length <= 0) {
			$("#placeholder").append("<li><p class='text-muted'>You currently have no friends! :(</p></li>");
		} else {
			for (const friend of result.friends) {
				$("#placeholder").append(`<li>${friend} <button type="button" class="btn btn-primary fa fa-envelope" data-toggle="modal" data-target="#exampleModal" data-whatever="${friend}"></button></li>`);
			}
		}
	}).fail((err) => {
		// do something with the failure, like laugh at the user
		window.alert("hahahahaha! NO!");
		console.error(err);
	});
}
