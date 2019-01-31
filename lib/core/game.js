const Loader = require('./loader')
const Room = require('./room')
const Player = require('./player')
const actions = require('../data/actions')

class Game {
    constructor(tale) {
        this.tale = tale
        this.player = new Player()
        this.data = {}
        this.status = {}
        this.error = null
    }

    init() {
        this.setData(Loader.load(this.tale))

        this.status = {
            player: {
                hp: 100,
                inventory: {},
                lastAction: null
            },
            room: this.data.rooms[this.data.meta.startingRoom],
            meta: {
                turn: 1,
                error: this.getErrorCode(),
                actions: ['init'],
            }
        }
    }

    act(input) {
        const {action, subject} = input

        switch (action) {
        case actions.WALK:
            this.movePlayer(subject)

        case actions.EXIT:
        case actions.LOOK:
        default:
            break
        }

        action && this.setAction(action)
        this.advanceTurn()
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

    // TODO: return key and value in order to print prompt
    getCurrentVisibleConnections() {
        return Object.values(this.status.room.connections).filter(connection => { return connection })
    }

    getTurn() {
        return this.status.meta.turn
    }

    getPlayerHp() {
        return this.player.getHealth()
    }

    getErrorCode() {
        return this.error
    }

    getLastAction(action) {
        return this.status.meta.actions.slice(-1)[0]
    }

    setData(data) {
        this.data = data
    }

    setError(error) {
        this.status.meta.error = error
    }

    setCurrentRoom(room) {
        this.status.room = room
    }

    setAction(action) {
        this.status.meta.actions.push(action)
    }

    hasError() {
        return this.error !== null
    }

    advanceTurn() {
        this.status.meta.turn++
    }

    movePlayer(direction) {
        const currentRoom = this.status.room
        const targetRoom = this.data.rooms[currentRoom.connections[direction]]

        if (targetRoom) {
            this.status.room = targetRoom
            this.player.setCurrentRoom(targetRoom)
        } else {
            this.setError('invalid_direction')
        }
    }
}

module.exports = Game
