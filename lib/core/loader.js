const fs = require('fs')

class Loader {
    static load(tale) {
        return {
            meta: this.loadResource(tale, 'meta'),
            rooms: this.loadResource(tale, 'rooms'),
            objects: this.loadResource(tale, 'objects'),
        }
    }

    static loadResource(tale, type) {
        const path = `${__dirname}/../../games/${tale}/${type}.json`
        const resource = JSON.parse(fs.readFileSync(path))

        return resource
    }
}

module.exports = Loader
