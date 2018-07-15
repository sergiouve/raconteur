const Loader = require('./loader');
const Prompter = require('./prompter');

class Game {
    constructor(tale) {
        this.tale = tale;
        this.prompter = new Prompter(this);
        this.data = {};
        this.status = {
            turn: 0,
            state: 'LOADED'
        };
    }

    init() {
        this.load();
        this.start();
    }

    start() {
        this.act('start');
    }

    act(action) {
        const input = this.parseInput(action);
        this.status.turn++;

        switch(input.action) {
        case 'look':
            this.prompter.look();
            break;

        case 'walk':
            this.walk(input.subject);
            this.prompter.look();
            break;

        case 'close':
            this.prompter.close();
            return;

        case 'start':
            this.prompter.welcome();
            this.prompter.look();

        default:
           // this.prompter.look();
        }

        this.prompter.ask();
    }

    parseInput(input = '') {
        const action = input.split(' ')[0];
        const subject = input.split(' ')[1];

        return { action: action, subject: subject };
    }

    load() {
        this.data = new Loader(this.tale).load();
        this.setCurrentRoom(this.data.meta.startingRoom);
    }

    getCurrentRoomDescription() {
        return this.data.rooms[this.status.room].description;
    }

    getCurrentRoomName() {
        return this.data.rooms[this.status.room].name;
    }
    getTurn() {
        return this.status.turn;
    }

    getPlayerHp() {
        return 100;
    }

    setCurrentRoom(room) {
        this.status.room = room;
    }

    walk(direction) {
        const room = this.data.rooms[this.status.room].connections[direction];

        if (room) {
            this.setCurrentRoom(room);
            return;
        }

        this.prompter.error('invalid_direction');
    }
}

module.exports = Game;
