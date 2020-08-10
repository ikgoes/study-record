const {
    File
} = require("./File.js");

class Local {
    constructor() {
        this.Directory = new Map;
        this.curDir = "";
    }

    printState = (state) => {
        this.Directory.get(this.curDir).forEach(x => {
            if (x.state === state) console.log(`${x.name} ${x.time}`)
        })
    }
}

module.exports = {
    Local
};