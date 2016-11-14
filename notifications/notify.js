const notifier = require("electron-notifications");

// // Just title
// notifier.notify("Message");
//
// // Full Options
// notifier.notify("Calendar", {
// 	message: "Event begins in 10 minutes",
// 	icon: "http://cl.ly/J49B/3951818241085781941.png",
// 	buttons: ["Dismiss", "Snooze"]
// });

module.exports.messageNotify = function messageNotify(user, message) {
	const notification = notifier.notify(`Message from ${user}`, {
		message: message,
		icon: "../images/icon-games.png"
	});
	notification.on("click", () => {
		notification.close();
	});
};
