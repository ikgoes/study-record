class File {
    constructor(name, time) {
        this.name = name;
        this.time = time;
        this.state = "Untracked";
    }
}

module.exports = {
    File
};