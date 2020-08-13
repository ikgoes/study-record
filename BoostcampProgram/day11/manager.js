const {
    Barista
} = require("./barista.js");
const EventEmitter = require('events');

class Manager extends EventEmitter {
    constructor(queue, dashboard) {
        super();
        this._queue = queue;
        this._dashboard = dashboard;
        this._baristas = [];
        this._count = 0;

        setInterval(function () {
            if (this._queue._ordersLeft.length) {
                if(this._baristas[this._count]._status.work1 === 0){
                    this._baristas[this._count]._status.work1 = 1;
                    this._baristas[this._count].emit('makeDrink',this._queue._ordersLeft[0], 1);
                    this._queue._ordersLeft.shift();
                }
                else if(this._baristas[this._count]._status.work2 === 0){
                    this._baristas[this._count]._status.work2 = 1;
                    this._baristas[this._count].emit('makeDrink',this._queue._ordersLeft[0], 2);
                    this._queue._ordersLeft.shift();
                }
                this._count = (this._count + 1) % 3;
            }
        }, 1000);

        this.on('drinkFinished', (drink) => {
            setImmediate(() => {
                let type;
                if (drink.drink === 1)
                    type = "아메리카노";
                else if (drink.drink === 2)
                    type = "카페라떼";
                else if (drink.drink === 3) 
                    type = "프라푸치노";
                console.log(`${order.customer} 님이 주문하신 ${type} 음료 나왔습니다.`);
            });
        });
    }

}

module.exports = {
    Manager
};