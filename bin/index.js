const Prompter = require('../lib/prompter');
const Game     = require('../lib/game');

try {
    const tale = process.argv[2].split('=')[1];
    const game = new Game(tale);

    new Prompter(game).start();
} catch (error) {
    console.log(error);
    console.log('You must provide a valid installed game');
    process.exit();
}
