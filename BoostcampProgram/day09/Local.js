const {
    File
} = require("./File.js");

function Local() {
    this.Directory = new Map();
    this.state = "Untracked";
    this.curDir;
    this.init = init;
    this.status = status;
    this.checkout = ckeckout;
    this.newCommand = newCommand;
    this.update = update;
    this.add = add;
    this.commit = commit;
}

init = (name) => {
    this.Directory.set(name, []);
}

status = (name) => {
    if (this.curDir === undefined) {    // checkout 이전 상태
        if (name === undefined) {
            for (let direc of this.Directory)
                console.log(direc[0] + '/');
        } else {
            console.log("wrong command");
        }
    } else {                            // checkout 이후
        // 구현해야하는 부분
    }
}

checkout = (name) => {
    this.curDir = name;
}

newCommand = () => {}
update = () => {

}
add = () => {

}
commit = () => {

}

module.exports = {
    Local
};