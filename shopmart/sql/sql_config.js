var Connection = require("tedious").Connection;
var Request = require("tedious").Request;

var config = {
  server: "localhost",
  authentication: {
    type: "default",
    options: {
      userName: "rks369",
      password: "123456",
    },
  },
  options: {
    trustServerCertificate: true,
    database: "shopcart",
  },
};

const sqlMethods = {
  executeQuery: (query) => {
    return new Promise((resolve, reject) => {
      var connection = new Connection(config);
      let request = new Request(query, function (err) {
        if (err) {
          reject(err);
        }
      });
      var result = [];


      request.on("row", function (columns) {
        let rowObj = {};
        columns.forEach(function (column) {
          if (column.value === null) {
            console.log("NULL");
          } else {
            rowObj[column.metadata.colName] = column.value;
          }
        });
        result.push(rowObj);
      });
      request.on('error',(err)=>{
        connection.close();
        reject(err)
      })
      request.on("requestCompleted", function (rowCount, more) {
        connection.close();
        resolve(result);
      });

      connection.connect();
      connection.on("connect", function (err) {
        if (err) reject(err);
        else {
          connection.execSql(request);
        }
      });
    });
  },
};

module.exports = sqlMethods;
