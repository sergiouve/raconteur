const Loader = require('./loader');
const Prompter = require('./prompter');
const Room = require('./room');
const Player = require('./player');

class Game {
    constructor(tale) {
        this.tale = tale;
        this.data = {};
        this.status = {
            turn: 0,
            state: 'LOADED',
            error: 'none'
        };
    }

    init() {
        this.load();
    }

    act(input) {
        const {action, subject} = input;

        switch (action) {
        case 'walk':
            this.walk(subject);

        case 'close':
        case 'look':
        default:
            break;
        }

        this.status.turn++;
    }

    load() {
        this.data = new Loader(this.tale).load();
        this.setCurrentRoom(this.data.meta.startingRoom);
    }

    getTaleTitle() {
        return this.data.meta.title;
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

    getErrorCode() {
        return this.status.error;
    }

    setCurrentRoom(room) {
        this.status.room = room;
    }

    hasError() {
        return this.status.error != 'none';
    }

    walk(direction) {
        const room = this.data.rooms[this.status.room].connections[direction];

        if (room) {
            this.setCurrentRoom(room);
        } else {
            this.status.error = 'invalid_direction';
        }
    }
}

module.exports = Game;
