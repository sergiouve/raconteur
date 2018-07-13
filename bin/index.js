const Game = require('../lib/game.js');
const tale = process.argv[2].split('=')[1];

new Game(tale).init();
