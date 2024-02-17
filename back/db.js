const mysql = require("mysql8")

var pool = mysql.createConnection({
    connectionLimit: 10,
    host:"localhost",
    user:"root",
    password:"mysql",
    database:"northwind",
    port:3306
})

function q(sql, parameters){
    return new Promise((resolve, reject) => {
        pool.query(sql, parameters, function(error, results, fields){
            if(error){
                reject(error)
                return
            }
            return resolve([results, fields])
        })
    })
}

module.exports = {
    q
}