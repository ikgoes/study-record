const { Local } = require("./Local.js"); 
const { File } = require("./File.js");
const { Commit } = require("./Commit.js");
const { Repository } = require("./Repository.js");
const { Remote } = require("./Remote.js");


class Git{
    constructor() {
        this.Directory = new Map;
        this.curDir = "";
    }

}

module.exports = {
    Git
};