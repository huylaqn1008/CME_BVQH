import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cme_employeems'
});

con.connect(function(err) {
    if(err) {
        console.log('Database connection failed: ' + err.stack);
    } else {
        console.log('Connected to database.');
    }
});

export default con; // cần export để route sử dụng
