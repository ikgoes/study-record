const readline = require("readline");
const {
    EventEmitter
} = require("events");

class Cashier extends EventEmitter {
    constructor(queue, dashboard) {
        super();
        this._queue = queue;
        this._dashboard = dashboard;
        this._count = 0;
        this.on('orderTaken', (order) => {
            setImmediate(() => {
                this._count++;
                const command = order.split(' ');
                command.forEach(x => {
                    let seg = x.trim().split(':');
                    if (seg[0] < 1 || seg[0] > 3)
                        console.log("주문 형식이 잘못 되었습니다. 형식에 맞는 음료만 제작 중 입니다.")
                    else {
                        let drink = {
                            drink: seg[0],
                            count: seg[1],
                            customer: this._count
                        }
                        this._queue.emit('orderSplit',drink);
                    }
                });
            });
        });
    }

    work = (cmd) => {
        console.log(cmd);
    }
}

module.exports = {
    Cashier
};