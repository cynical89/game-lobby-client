"use strict";

$(document).ready(() => {
	getUserInfo();
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
		$("#userInfo").html(result.username);
		if (result.friends.length <= 0) {
			$("#placeholder").append("<li><p class='text-muted'>You currently have no friends! :(</p></li>");
		} else {
			for (const friend of result.friends) {
				$("#placeholder").append(`<li>${friend}</li>`);
			}
		}
	}).fail((err) => {
		// do something with the failure, like laugh at the user
		window.alert("hahahahaha! NO!");
		console.error(err);
	});
}
