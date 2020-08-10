const {
    Local
} = require("./Local.js");
const {
    File
} = require("./File.js");
const {
    Commit
} = require("./Commit.js");
const {
    Repository
} = require("./Repository.js");
const {
    Remote
} = require("./Remote.js");

class Git {
    constructor() {
        this.local = new Local();
        this.commit = new Commit();
        this.repository = new Repository();
        this.remote = new Remote();
    }

    init = (name) => {
        try {
            this.local.Directory.set(name, []);
            console.log(`created ${name} repository.`);
        } catch (err) {
            console.error(err);
        }
    }

    status = (name) => {
        if (name === "remote") {
            this.remote.status(this.local.curDir);
        } else if (this.local.curDir === "") { // checkout 이전 상태
            if (name === undefined) {
                for (let direc of this.local.Directory.keys())
                    console.log(direc + '/');
            } else {
                console.log("wrong command");
            }
        } else { // checkout 이후
            console.log("---Working Directory/");
            this.local.printState("Untracked");
            console.log("---Staging Area/");
            this.local.printState("Staged");
            console.log("---Git Repository/")
            this.local.printState("Unmodified");
        }
    }

    checkout = (name) => {
        if (name === undefined)
            this.local.curDir = "";
        else if (this.local.Directory.get(name) === undefined) {
            console.log("directory does not exist");
        } else {
            this.local.curDir = name;
        }
    }

    newFile = (name) => {
        if (this.local.Directory.get(this.local.curDir).findIndex(x => {
                return x.name === name
            }) !== -1) {
            console.log(`file name \"${name}\" already exists`);
        } else {
            const file = new File(name, this.getTime());
            this.local.Directory.get(this.local.curDir).push(file);
        }
    }

    update = (name) => {
        this.local.Directory.get(this.local.curDir).forEach(x => {
            if (x.name === name) {
                x.time = this.getTime();
            }
        });
    }

    add = (name) => {
        if (this.local.Directory.get(this.local.curDir).findIndex(x => {
                return x.name === name
            }) === -1) {
            console.log(`file name \"${name}\" is not on working directory`);
        } else {
            this.local.Directory.get(this.local.curDir).forEach(x => {
                if (x.name === name) {
                    x.state = "Staged"
                };
            });
            console.log("---Staging Area/")
            this.local.printState("Staged");
        }
    }

    commits = (message) => {
        const commit_log = message || "default message";
        console.log("---commit files/");
        this.local.Directory.get(this.local.curDir).forEach(x => {
            if (x.state === "Staged") {
                x.time = this.getTime();
                x.state = "Unmodified";
                this.commit.message.push(commit_log);
                console.log(`${x.name} ${x.time}`);
                this.repository.HEAD.push({
                    message: commit_log,
                    filename: x.name,
                    filetime: x.time
                });
            };
        });
    }

    log = () => {
        this.commit.message.forEach(x => {
            console.log(`commit \"${x}\"`);
            this.repository.log(x);
        });
    }

    push = () => {
        console.log("push some commits...")
        if (this.remote.Directory.get(this.local.curDir) === undefined)
            this.remote.Directory.set(this.local.curDir, []);
        this.commit.message.forEach(x => {
            console.log(`commit \"${x}\" pushed`);
            this.remote.lastCommit = `last commit \"${x}\"`;
            this.repository.HEAD.forEach(index => {
                if (index.message === x) {
                    const file = new File(index.filename, index.filetime);
                    this.remote.Directory.get(this.local.curDir).push(file);
                }
            });
        });
    }


    clear = () => {
        this.commit.clear();
        this.repository.clear();
    }

    getTime = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ((today.getMonth() < 9) ? "0" : "") + (today.getMonth() + 1);
        const day = (today.getDate() < 10 ? "0" : "") + today.getDate();
        const hour = (today.getHours() < 10 ? "0" : "") + today.getHours();
        const minute = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
        const second = (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
        const time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return time;
    }
}

module.exports = {
    Git
};