const readline = require('readline')
const EOL = require('os').EOL
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const actions = require('../data/actions')

class Prompter {
    constructor(Game, options) {
        this.game = Game
        this.debug = options.debug
    }

    boot() {
        this.game.init()
        this.paint()
    }

    paint() {
        const status = this.game.getStatus()

        if (status.error) {
            this.printError(status.meta.error)
        }

        this.clean()
        this.debug && this.printDebug()
        this.printScene()
        this.ask()
    }

    ask() {
        const prompt = this.build()

        rl.question(prompt, input => {
            const parsedInput = this.parseInput(input)

            this.game.act(parsedInput)
            this.paint()
        })
    }

    printScene() {
        const status = this.game.getStatus()
        const lastAction = this.game.getLastAction()
        let sceneString = status.room.name + EOL + status.room.shortDescription

        if (lastAction === actions.LOOK) {
            sceneString += EOL + EOL + status.room.longDescription
                + EOL + EOL + 'You see the following exits: ' + this.game.getCurrentVisibleConnections()
        }

        process.stdout.write(sceneString + EOL + EOL)
    }

    printDebug() {
        const status = this.game.getStatus()

        console.log('DEBUG INFO', EOL)
        console.log('LOADED GAME:', this.game.tale)
        console.log('CURRENT STATUS')
        console.log(status)
        console.log('END DEBUG INFO', EOL)
    }

    parseInput(input) {
        const action = input.split(' ')[0]
        const subject = input.split(' ')[1]

        return { action: action, subject: subject }
    }

    clean() {
        process.stdout.write('\x1Bc')
    }

    build() {
        const status = this.game.getStatus()

        return `${EOL + EOL}[turn: ${status.meta.turn} HP: ${status.player.hp}] >> `
    }

    welcome() {
        return `Welcome to ${this.game.getTaleTitle()}`
    }

    look() {
        return `${this.game.getCurrentRoomName() + EOL}---${EOL + this.game.getCurrentRoomDescription()}`
    }

    renderError(code) {
        let error = `~~~~~~~~~~~~~~~~~~~~${EOL}`

        switch(code) {
        case 'invalid_direction':
            error += 'You can\'t walk in that direction'
            break
        // TODO
        case 'invalid_command':
            error += 'Invalid command'
            break
        default:
            error += 'UNHANDLED ERROR'
        }

        error += `${EOL}~~~~~~~~~~~~~~~~~~~~${EOL}`

        return error
    }

    close() {
        rl.close()
        process.exit()
    }
}

module.exports = Prompter
