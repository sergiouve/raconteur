const readline = require('readline');
const EOL = require('os').EOL;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Prompter {
    constructor(Game) {
        this.game = Game;
    }

    paint(scene) {
        console.log(EOL + scene + EOL);
    }

    build() {
        return `[turn: ${this.game.getTurn()} HP: ${this.game.getPlayerHp()}] >> `;
    }

    welcome() {
        const scene = `Welcome to TEST`;
        this.paint(scene);
    }

    ask() {
        const prompt = this.build();
        rl.question(prompt, input => {
            this.game.act(input);
        });
    }

    look() {
        const scene = `${this.game.getCurrentRoomName() + EOL} --- ${EOL + this.game.getCurrentRoomDescription()}`;
        this.paint(scene);
    }

    error(code) {
        console.log('~~~~~~');
        switch(code) {
        case 'invalid_direction':
            console.log('You can\'t go that way');
            break;
        default:
            console.log('MEGA ERROR!');
        }
        console.log('~~~~~~');
    }

    close() {
        rl.close();
    }
}

module.exports = Prompter;
