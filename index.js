
var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

var connection = mysql.createConnection({
  host:  "127.0.0.1",
  port: 3306,
  user: "root",
  password:"",
  database:"biasharaDB"
});

connection.connect(function(error){
  if(error) {
    return console.log("Connection error " +error);
  }else{
    console.log("Connected , id "+connection.threadId+"\n");
    var queryString = "SELECT * FROM products";
    displayItems(queryString);
  }
});

function displayItems( queryString ){
  console.log("All Items available for sell");
  connection.query( queryString, function(error,res){
    if(error){
      console.log("Error querying database: "+error);
    }else{
      console.log(columnify(res));
    }
  });
}

//connection.end() //TODO: to end connection
