const config = require('../config/config')
const { Pool } = require('pg');


let host;
let dbname;
let username;
let password;

if (config.env === 'development') {
    host = config.db.host;
    dbname = config.db.name;
    username = config.db.user;
    password = config.db.password;
} else {
    host = config.proddb.host;
    dbname = config.proddb.name;
    username = config.proddb.user;
    password = config.proddb.password;
}



const poolConnection = new Pool({
    user: username,
    host: host,
    database: dbname,
    password: password,
    port: 5432,
    log : false
});

module.exports = poolConnection;
