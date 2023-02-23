const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.json({ msg: "Sucess" });
});

var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

// Create connection to database
var config = {
  server: 'localhost',
  authentication: {
    type: "default",
    options: {

      userName: "rks369", // update me
      password: "123456", // update me
    },
  },
  options: {
    trustServerCertificate: true    ,
    database: "learning",
  },

};
var connection = new Connection(config);
connection.on("connect", function (err) {
  // If no error, then good to proceed.
  executeStatement()

  console.log("Connected",err);
});

connection.connect();

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
   let  request = new Request("SELECT * From Studnet", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}  

app.listen(port, () => {
  console.log("Server Is Started At http://localhost:" + port);
});
