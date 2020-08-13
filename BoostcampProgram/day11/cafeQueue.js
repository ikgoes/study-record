const EventEmitter = require('events');

class CafeQueue extends EventEmitter{
    constructor(){
        super();
        this._ordersLeft = [];
        
        this.on('orderSplit', (drink) => {
            setImmediate(() => {
                this._ordersLeft.push(drink);
            });
        });
    }
}

module.exports = {
    CafeQueue
};