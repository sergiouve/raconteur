const Loader = require('./loader')
const Room = require('./room')
const Player = require('./player')

class Game {
    constructor(tale) {
        this.tale = tale
        this.player = new Player()
        this.data = {}
        this.status = {}
        this.turn = 1
        this.error = null
    }

    init() {
        this.load()
        this.status = {
            player: {
                hp: 100,
                inventory: {},
                lastAction: null
            },
            room: {
                name: this.getCurrentRoomName(),
                description: this.getCurrentRoomDescription(),
                longDescription: this.getCurrentRoomLongDescription(),
                objects: {},
                connections: this.getCurrentRoomConnections()
            },
            meta: {
                turn: this.getTurn(),
                error: this.getErrorCode()
            }
        }
    }

    act(input) {
        const {action, subject} = input

        switch (action) {
        case 'walk':
            this.movePlayer(subject)

        case 'close':
        case 'look':
        default:
            break
        }

        this.advanceTurn()
        // TODO: move to own method?
        this.status = {
            player: {
                hp: 100,
                inventory: {},
                lastAction: action
            },
            room: {
                name: this.getCurrentRoomName(),
                description: this.getCurrentRoomDescription(),
                longDescription: this.getCurrentRoomLongDescription(),
                objects: {},
                connections: {}
            },
            meta: {
                turn: this.getTurn(),
                error: this.getErrorCode()
            }
        }
    }

    load() {
        const data = Loader.load(this.tale)
        const startingRoom = data.rooms[data.meta.startingRoom]

        this.setData(data)
        this.player.setCurrentRoom(startingRoom)
    }

    getStatus() {
        return this.status
    }

    getTaleTitle() {
        return this.data.meta.title
    }

    getCurrentRoomDescription() {
        const room = this.player.getCurrentRoom()

        return room.short_description
    }

    getCurrentRoomLongDescription() {
        const room = this.player.getCurrentRoom()

        return room.short_description
    }

    getCurrentRoomName() {
        const room = this.player.getCurrentRoom()

        return room.name
    }

    getCurrentRoomConnections() {
        const room = this.player.getCurrentRoom()
        const connections = room.connections

        return connections
    }

    getTurn() {
        return this.turn
    }

    getPlayerHp() {
        return this.player.getHealth()
    }

    getErrorCode() {
        return this.error
    }

    setData(data) {
        this.data = data
    }

    setError(error) {
        this.error = error
    }

    setCurrentRoom(room) {
        this.status.room = room
    }

    hasError() {
        return this.error !== null
    }

    advanceTurn() {
        this.turn++
    }

    movePlayer(direction) {
        const currentRoom = this.player.getCurrentRoom()
        const targetRoom = this.data.rooms[currentRoom.connections[direction]]

        if (targetRoom) {
            this.player.setCurrentRoom(targetRoom)
        } else {
            this.setError('invalid_direction')
        }
    }
}

module.exports = Game
