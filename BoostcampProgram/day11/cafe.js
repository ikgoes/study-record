const {
    Cashier
} = require("./cashier.js");
const { CafeQueue } = require("./cafeQueue");
const {
    Dashboard
} = require("./dashboard.js");
const {
    Manager
} = require("./manager.js");


class Cafe extends EventEmitter {
    constructor(name) {
        super();
        this._queue = new CafeQueue();
        this._dashboard = new Dashboard;
        this._manager = new Manager(this._queue, this._dashboard);
        this._cashier = new Cashier(this._queue, this._dashboard);
        this.readline = require('readline');
        this.r = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    showMenu = () => {
        console.log("> 메뉴  =  1. 아메리카노(3s)    2. 카페라떼(5s)    3. 프라프치노(10s)");
        console.log("> 주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2");
    }

    open = () => {
        console.log("> 필요한 바리스타 인원수를 입력해주세요. ");
        this.r.prompt();
        this.r.on('line', (cmd)=>{
            this.r.removeAllListeners();
            let countBarista = parseInt(cmd);
            this.hireBarista(countBarista);
            console.log(`현재 카페에 바리스타는 총 ${countBarista}명 입니다.`)
            this.showMenu();
            this.takeOrder();
        });

    }

    takeOrder(){
        this.r.setPrompt('> ')
        this.r.prompt();
        this.r.on('line', (command) => {
            this._cashier.emit('orderTaken', command);
        });
    }
    
    hireBarista = (num) => {
        while(num--){
            let passedBarista = new Barista(this._manager);
            this._manager._baristas.push(passedBarista);
        }
    }
}

const cafe = new Cafe();
cafe.open();
