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
        data.objects = this.parseConfigFile(this.tale, 'objects');

        return data;
    }

    parseConfigFile(tale, file) {
        const filePath = `${__dirname}/../games/${tale}/${file}.json`;
        const config = fs.readFileSync(filePath);
        const parsedConfig = JSON.parse(config);

        return parsedConfig;
    }
}

module.exports = Loader;
