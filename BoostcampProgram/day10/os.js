// 프로세스의 구조와, 쓰레드 간단 구현

const {
    Process
} = require("./process.js");


class OS {
    constructor() {
        this._queue = [];
        this._time = 2000;
        this.checkDuplicate = new Array;
        this._index = 0;
    }

    enQueue = (process) => {
        process._status = "waiting";
        this._queue.push(process);
    }

    printProcess = () => {
        this._queue.forEach(x => {
            console.log(`${x._name}(${x._status}), ${x._time} / ${x._duration}sec`)
        });
        console.log("-------------------------------");
        if (this.checkTerminated()) {
            console.log("모든 프로세스가 종료되었습니다.");
            return -1;
        }
    }

    init = () => {
        const processA = new Process("프로세스A", this.randomNumber());
        const processB = new Process("프로세스B", this.randomNumber());
        const processC = new Process("프로세스C", this.randomNumber());
        const processD = new Process("프로세스D", this.randomNumber());
        this.enQueue(processA);
        this.enQueue(processB);
        this.enQueue(processC);
        this.enQueue(processD);
    }

    // 5 ~ 10 사이의 랜덤한 숫자를 반환
    randomNumber = () => {
        const randomTime = Math.floor(Math.random() * 6) + 5;
        if (this.checkDuplicate.filter(x => x === randomTime).length === 0) {
            this.checkDuplicate.push(randomTime);
            return randomTime;
        } else {
            this.checkDuplicate.push(randomTime);
            return this.randomNumber();
        }
    }

    execute = () => {
        this.scheduelProcess();
        if (this.readyForRun(this._queue[this._index % 4])) {
            this._queue[this._index % 4]._status = "running";
            this._queue[this._index % 4]._time++;
        }
        if (this.printProcess() === -1) {
            return;
        }
        this.checkAfterWork(this._queue[this._index % 4]);
        setTimeout(this.execute, 1000);
    }

    // 작업할 프로세스를 반환해준다
    scheduelProcess = () => {
        this._index++;
        if (this._queue[this._index % 4].status === "terminated"){
            this.scheduelProcess();
        }
        return;
    }

    // 작업이 끝난 후 프로세스의 상태 확인
    checkAfterWork = (process) => {
        if (process._time < process._duration)
            process._status = "waiting";
        else if (process._time === process._duration)
            process._status = "terminated";
    }

    // 프로세스가 running 상태로 갈 수 있는지 확인.
    readyForRun = (process) => {
        return (process._status === "ready" || process._status === "waiting");
    }

    // 모든 프로세스가 state 인지 확인
    checkTerminated = () => {
        return this._queue.every(x => x._status === "terminated");
    }
}

const os = new OS;
os.init();
os.execute();