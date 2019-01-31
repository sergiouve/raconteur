class Player {
    constructor() {
        this.name = null;
        this.heath = 100;
        this.room = null;
        this.inventory = [];
    }

    getCurrentRoom() {
        return this.room;
    }

    setCurrentRoom(room) {
        this.room = room;
    }

    getHealth() {
        return this.health;
    }
}

module.exports = Player;
