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

    start() {
        this.game.init();
        this.paint('welcome');
    }

    paint(action) {
        let error = this.game.getErrorCode();
        let scene;

        switch (action) {
        case 'look':
            scene = this.look();
            break;

        case 'welcome':
            scene = this.welcome();
            break;

        case 'close':
            this.close();
            break;

        default:
            scene = this.look();
            break;
        }

        if (error) {
            scene = this.renderError(this.game.getErrorCode()) + EOL + scene;
            this.game.setError(null);
        }

        this.clean();
        this.print(scene);
        this.ask();
    }

    ask() {
        const prompt = this.build();

        rl.question(prompt, input => {
            const parsedInput = this.parseInput(input);

            this.game.act(parsedInput);
            this.paint(parsedInput.action);
        });
    }

    parseInput(input) {
        const action = input.split(' ')[0];
        const subject = input.split(' ')[1];

        return { action: action, subject: subject };
    }

    print(scene) {
        process.stdout.write(EOL + scene + EOL);
    }

    clean() {
        process.stdout.write('\x1Bc');
    }

    build() {
        return `${EOL + EOL}[turn: ${this.game.getTurn()} HP: ${this.game.getPlayerHp()}] >> `;
    }

    welcome() {
        return `Welcome to ${this.game.getTaleTitle()}`;
    }

    look() {
        return `${this.game.getCurrentRoomName() + EOL}---${EOL + this.game.getCurrentRoomDescription()}`;
    }

    renderError(code) {
        let error = `~~~~~~~~~~~~~~~~~~~~${EOL}`;

        switch(code) {
        case 'invalid_direction':
            error += 'You can\'t walk in that direction';
            break;
        default:
            error += 'UNHANDLED ERROR';
        }

        error += `${EOL}~~~~~~~~~~~~~~~~~~~~${EOL}`;

        return error;
    }

    close() {
        rl.close();
        process.exit();
    }
}

module.exports = Prompter;
