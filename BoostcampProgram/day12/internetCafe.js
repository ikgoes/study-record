const mysql = require('mysql2/promise');
const readline = require('readline');

const debug = true;

const printSeat = async (conn) => {
    const [seats] = await conn.query('select * from seat where userid is NULL');
    if (seats.length === 0) {
        console.log("비어 있는 자리가 없습니다.");
        return;
    }
    console.log("> 현재 빈 자리는 다음과 같습니다.")
    let str = "[ ";
    seats.forEach((s) => {
        str += s.id + ", ";
    });
    str = str.substr(0,str.length-2) + ']';
    console.log(str);
};

const getEmptySeat = async (conn) => {
    const [[seat]] = await conn.query('select * from seat where userid is NULL limit 1');
    return seat;    
}

const now = ()=> {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

//new user go empty seat!
const newUser = async (conn) => {
    const seat = await getEmptySeat(conn);
    if (!seat) {
        console.log("현재 비어있는 자리가 없습니다.");
        return;
    }
    //console.dir(seat);
    const [{insertId}] = await conn.execute('insert into user(start) values(:date)',{date: now()});
    console.log(`${seat.id}번 자리에 앉으세요 : #${insertId}`);
    await conn.execute('update seat set userid = :uid where id = :sid', {uid: insertId, sid: seat.id});
    await printSeat(conn);
};

const stop = async (conn, sid) => {
    if (!sid) {
        console.log("좌석번호를 지정해 주세요.");
        return;
    }

    const [[{userid}]] = await conn.query('select userid from seat where id=:sid', {sid});
    if (!userid) {
        console.log("자리가 비어있습니다.");
        return;
    }
    await conn.execute('update seat set userid = NULL where id = :sid', {sid});
    await conn.execute('update user set end = :now where id = :userid', {userid, now: now()});
    await printSeat(conn);
}

const log = async (conn) => {
    const [users] = await conn.query('select * from user');
    users.forEach( (user) => {
        const end = user.end === null ? "사용중" : user.end;
        console.log(`${user.id}: [${user.start} - ${end}]`);
        //console.dir(user);
    });
};

const runCommand = async (conn, cmd, arg) => {
    try {
    switch (cmd){
        case 'new': 
            await newUser(conn);
            break;
        case 'stop':
            await stop(conn, arg);
            break;
        case 'status':
            await printSeat(conn);
            break;
        case 'log':
            await log(conn);
            break;
        default: 
            console.error("잘못된 입력입니다.");
    }
    } catch (error) {
        console.error("500 에러 발생");
        if (debug) {
            console.error(error);
        }
    }
};

const main = async () => {
    const conn = await mysql.createConnection({
        host: '192.168.99.100',
        user: 'seogki',
        password: 'skkim98',
        database: 'seogkidb'
    });   
    conn.config.namedPlaceholders = true;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    await printSeat(conn);
    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', async (line) => {
        if (line.length == 0) return;
        if (line == 'quit') {
            await printSeat(conn);
            await log(conn);
            rl.close();
        }
        cmd = line.split(' ');
        await runCommand(conn, ...cmd);  
        rl.prompt();      
    }).on('close', () => {
        console.log("\n피시방을 종료합니다.")
        process.exit();
    });

}

main();