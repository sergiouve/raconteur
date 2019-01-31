const Prompter = require('../lib/prompter/prompter')
const Game     = require('../lib/core/game')

try {
    let debugMode
    const tale = process.argv[2].split('=')[1]
    const game = new Game(tale)
    const options = {
        debug: process.argv[3] === 'debug'
    }

    new Prompter(game, options).boot()
} catch (error) {
    console.log(error)
    console.log('===> You must provide a valid installed tale')
    process.exit()
}
