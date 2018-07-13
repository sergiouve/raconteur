const Loader = require('./loader');
const Prompter = require('./prompter');

class Game {
    constructor(tale) {
        this.tale = tale;
        this.data = {};
        this.prompter = new Prompter;
    }

    init() {
        this.load();
        this.start();
    }

    start() {
        this.prompter.boarding(`Welcome to ${this.tale}`);
        this.prompter.room(this.data.rooms[this.data.meta.startingPoint]);
    }

    load() {
        this.data = new Loader(this.tale).load();
    }
}

module.exports = Game;
