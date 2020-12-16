 const mysql = require('mysql2');

    const query = (sql) => {
      return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
          host: 'localhost',
          port: "3306",
          user: 'root',
          database: 'fcpinturas',
          password: 'W3llington6991'
        });
    
        connection.connect();
    
        connection.query(sql, (error, results) => {
          connection.end();
    
          if (error) {
            console.log(error);
            
            reject(error);
          }
    
          resolve(results);
        });
      })
    }
    
    module.exports = {
      query,
    };