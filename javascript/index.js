"use strict";
const config = require("../config.json");

$("#signin").on("click", (e) => {
	e.preventDefault();
	const username = $("#gc_user").val();
	const password = $("#gc_pass").val();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: `${config.site.apiHost}:${config.site.port}/login`,
		data: {username: username, password: password}
	}).done((result) => {
		if (result.error === true) {
			alert(result.message);
			return console.error(result.message);
		}
		// do something with the success, like show a link
		console.log(result);
		window.location = "lobby.html";
	}).fail((err) => {
		// do something with the failure, like laugh at the user
		window.alert("hahahahaha! NO!");
		console.error(err);
	});
});
