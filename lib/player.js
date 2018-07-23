class Player {
    constructor() {
        this.room = null;
        this.name = null;
        this.inventory = [];
    }

    getCurrentRoom() {
        return this.room;
    }

    setCurrentRoom(room) {
        this.room = room;
    }
}

module.exports = Player;
