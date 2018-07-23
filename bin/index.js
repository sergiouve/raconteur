const Prompter = require('../lib/prompter');
const Game     = require('../lib/game');
const tale     = process.argv[2].split('=')[1];
const game = new Game(tale);

new Prompter(game).start();
