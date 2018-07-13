const fs = require('fs');

// TODO make static
class Loader {
    constructor(tale) {
        this.tale = tale;
    }

    load() {
        let data = {};
        data.meta = this.parseConfigFile(this.tale, 'meta');
        data.rooms = this.parseConfigFile(this.tale, 'rooms');

        return data;
    }

    parseConfigFile(tale, file) {
        return JSON.parse(fs.readFileSync(`${__dirname}/../games/${tale}/${file}.json`));
    }
}

module.exports = Loader;
