const {
    File
} = require("./File.js");

class Local {
    constructor() {
        this.Directory = new Map;
        this.curDir = "";
    }

    init = (name) => {
        try {
            this.Directory.set(name, []);
            console.log(`created ${name} repository.`);
        } catch (err) {
            console.error(err);
        }
    }

    status = (name) => {
        if (this.curDir === "") { // checkout 이전 상태
            if (name === undefined) {
                for (let direc of this.Directory.keys())
                    console.log(direc + '/');
            } else {
                console.log("wrong command");
            }
        } else { // checkout 이후
            console.log("---Working Directory/");
            this.printState("Untracked");
            console.log("---Staging Area/");
            this.printState("Staged");
            console.log("---Git Repository")
            this.printState("Unmodified");
        }
    }

    checkout = (name) => {
        if (this.Directory.get(name) === undefined) {
            console.log("directory does not exist");
        } else {
            if (name === undefined)
                this.curDir = "";
            else
                this.curDir = name;
        }
    }

    newFile = (name) => {
        if (this.Directory.get(this.curDir).findIndex(x => {
                return x.name === name
            }) !== -1) {
            console.log(`file name \"${name}\" already exists`);
        } else {
            const file = new File(name, getTime());
            this.Directory.get(this.curDir).push(file);
        }
    }

    update = (name) => {
        this.Directory.get(this.curDir).forEach(x => {
            if (x.name === name) {
                x.time = getTime();
            }
        });
    }

    add = (name) => {
        if (this.Directory.get(this.curDir).findIndex(x => {
                return x.name === name
            }) === -1) {
            console.log(`file name \"${name}\" is not on working directory`);
        } else {
            this.Directory.get(this.curDir).forEach(x => {
                if (x.name === name) {
                    x.state = "Staged"
                };
            });
            console.log("---Staging Area/")
            this.printState("Staged");
        }
    }
    commit = (message) => {
        commit_log = (message.length ===0)?"default message":message;  
        
    }

    printState = (state) => {
        this.Directory.get(this.curDir).forEach(x => {
            if (x.state === state) console.log(`${x.name} ${x.time}`)
        })
    }

    getTime = () =>{
        const today = new Date();
        const time = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        return time;
    }
}

