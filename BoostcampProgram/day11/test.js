const EventEmitter = require('events');
const emitter = new EventEmitter();


const printf = (arg) =>{console.log(arg);}


emitter.on('this', () =>{ printf("or is it here!");});

setImmediate(() => emitter.emit('this'));
console.log("will this happen first?");