const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10, // 最大连接数
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'samsung'
});
module.exports = pool;
/* const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'samsung'
});
con.connect()
const sql = 'select * from users;'
con.query(sql, (err, res) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(res)
})

module.exports = con; */