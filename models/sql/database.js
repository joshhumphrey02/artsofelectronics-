const mysql = require("mysql");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

const options = {
  connectionLimit: 150,
  multipleStatements: true,
  host: process.env.HOST,
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  max_allowed_packet:'10G'
};
const pool = mysql.createPool(options);
pool.setMaxListeners(200);

module.exports = {
  sessionStore: new MySQLStore(
    {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      expiration: 259200000,
      port: 3306,
      connectionLimit: 150,
      createDatabaseTable: true,
      clearExpired: true,
    },
    pool
  ),
  db: async (query, params, callback) => {
    await pool.getConnection(async (err, connection) => {
      if (err) {
        return callback(err.code, null);
      } else {
        if (params == undefined || params == null || params.length == 0) {
          await connection.query(query, (err, results) => {
            connection.release();
            if (!err) {
              callback(null, results);
            } else {
              console.log(err);
              callback(err.code, null);
            }
          });
        } else {
          await connection.query(query, params, (err, results) => {
            connection.release();
            if (!err) {
              callback(null, results);
            } else {
              callback(err.code, null);
            }
          });
        }
      }
      connection.on("error", (err) => {
        connection.release();
        //if (err) console.log(err.code);
      });
    });
  },
};

//require('./schema');
