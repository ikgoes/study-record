const mysql2 = require('mysql2/promise')

const seatSetting = async (con) => {
    await con.execute('delete from seat');
    for (let i = 0; i < 16; i++)
        await con.execute('insert into seat(id, userid) values(?,null)', [i + 1]);
    const [seats] = await con.query('select * from seat');
    seats.forEach(x => {
        console.log(x.id, x.userid);
    });
};
 
const startUser = async (con) => {
    await con.execute('delete from user');
};

const main = async () =>{
    const con = await mysql2.createConnection({
        host: '192.168.99.100',
        port: '3306',
        user: 'seogki',
        password: 'skkim98',
        database: 'seogkidb'
    });
    seatSetting(con);
    startUser(con);
    console.log('started db');
    process.exit();
}

main();

