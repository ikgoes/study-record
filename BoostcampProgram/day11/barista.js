const EventEmitter = require('events');

class Barista extends EventEmitter{
    constructor(manager){
        super();
        this._manager = manager;
        this._status = { work1 : 0 , work2 : 0}; // 0 : 아무것도 하지 않는 상태

        this.on('makeDrink', (order, which) =>{
            let time = (order.drink == 1)?3:((order.drink == 2)?5:((order.drink ==3)?10:0));
            setTimeout(function(){
                
            },time*1000);
            if(which === 1)
                this._status.work1 = 0;
            else if(which ===2)
                this._status.work2 = 0 ;
            this._manager.emit('drinkFinished', order);
        })
    }
}

module.exports = {
    Barista
};