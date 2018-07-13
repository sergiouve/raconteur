class Prompter {
    boarding(message) {
        console.log(message);
        console.log();
    }

    room(room) {
        console.log(room.name);
        console.log('======');
        console.log(room.description);
    }
}

module.exports = Prompter;
