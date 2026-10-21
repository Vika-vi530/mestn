const cowsay = require("cowsay");

const appName = "My Mobile App";
const version = "1.0.0";
const author = "Student";
function showMessage(text, useThink = false) {
    if (useThink) {
        console.log(
            cowsay.think({
                text: text,
                e: "11",
                T: "U "
            })
        );
    } else {
        console.log(
            cowsay.say({
                text: text,
                e: "oO",
                T: "U "
            })
        );
    }
}

const startMessage = `${appName} v${version} has started!`;
showMessage(startMessage);

showMessage("Welcome!");
showMessage("Loading...");

const stopMessage = `${appName} by ${author} is shutting down...`;
showMessage(stopMessage, true);

showMessage("Goodbye!");