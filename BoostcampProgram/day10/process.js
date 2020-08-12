class Process {
    constructor(name, duration) {
        this._name = name;
        this._duration = duration;
        this._time = 0;
        this._status = "ready";
    }

}


module.exports = {
    Process
};