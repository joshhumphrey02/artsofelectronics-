const mysql = require('mysql');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const options = {
    connectionLimit: 150,
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'artsofelectronics'
}
const pool = mysql.createPool(options)

module.exports = {
    sessionStore: new MySQLStore({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'artsofelectronics',
        expiration: 259200000,
        connectionLimit: 150,
        createDatabaseTable: true,
        clearExpired: true,
    }, pool),
    db: async( query, params, callback) => { 
        await pool.getConnection(async(err, connection) => {
            if (err) {
                connection.release();
                callback(err.code, null);
            }
            else{
                if(params == undefined || params == null || params.length == 0){
                    await connection.query(query,  (err, results) => {
                        connection.release();
                        if (!err) {
                            callback(null, results);
                        }
                        else {
                            console.log(err)
                            callback(err.code, null);
                        }
                    });
                }
                else{
                    await connection.query(query, params,  (err, results) => {
                        connection.release();
                        if (!err) {
                            callback(null, results);
                        }
                        else {
                            callback(err.code, null);
                        }
                    });
                }
            }
            connection.on('error',(err) => {
                connection.release();
                if(err) throw new Error(err.code);
            });
        });
    }
}

require('./schema');