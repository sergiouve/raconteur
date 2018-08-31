const Loader = require('./loader');
const Prompter = require('./prompter');
const Room = require('./room');
const Player = require('./player');

class Game {
    constructor(tale) {
        this.tale = tale;
        this.player = new Player();
        this.data = {};
        this.status = {
            turn: 0,
            state: 'LOADED',
            error: null
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
        const data = new Loader(this.tale).load();
        const startingRoom = data.rooms[data.meta.startingRoom];

        this.setData(data);
        this.player.setCurrentRoom(startingRoom);
    }

    getTaleTitle() {
        return this.data.meta.title;
    }

    getCurrentRoomDescription() {
        const room = this.player.getCurrentRoom();

        return room.description;
    }

    getCurrentRoomName() {
        const room = this.player.getCurrentRoom();

        return room.name;
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

    setData(data) {
        this.data = data;
    }

    setError(error) {
        this.status.error = error;
    }

    setCurrentRoom(room) {
        this.status.room = room;
    }

    hasError() {
        return this.status.error != 'none';
    }

    walk(direction) {
        const currentRoom = this.player.getCurrentRoom();
        const targetRoom = this.data.rooms[currentRoom.connections[direction]];

        if (targetRoom) {
            this.player.setCurrentRoom(targetRoom);
        } else {
            this.setError('invalid_direction');
        }
    }
}

module.exports = Game;
