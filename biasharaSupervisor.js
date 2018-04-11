
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
    //console.log("Connected , id "+connection.threadId+"\n");
    var queryString = "SELECT * FROM products";
    displayItems(queryString);
  }
});

function displayItems( queryString ){
  //display items based on the query supplied! 
  connection.query( queryString, function(error,res){
    if(error){
      console.log(error);
    }else{
      console.log(columnify(res));
    }
    console.log("-------------------------------------------------------------------------------");
    askUser();
  });
}

function askUser(){
  //prompts the user to enter the id of the item and the quantity to buy! 
  var questions = [
  {
    name: "id",
    message: "Enter the id of the product you would like to buy"
  },{
    name: "quantity",
    message: "How many do you want ?"
  }];
  inquirer.prompt(questions).then( function(product){

    });
  });
}

function updateProduct(id,newStock){
  var queryString = "UPDATE products SET stock="+newStock+" WHERE id="+id;
  connection.query(queryString,function(error, response){
    if(error){ 
      return console.log(error);
    }
  });
}

