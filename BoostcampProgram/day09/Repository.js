const {
    File
} = require("./File.js");

class Repository {
    constructor() {
        this.HEAD = [];
    }

    log = (message) => {
        this.HEAD.forEach(x => {
            if (x.message === message) console.log(x.filename + " " + x.filetime);
        });
    }

    clear = () => {
        this.HEAD = [];
    }
}

module.exports = {
    Repository
};