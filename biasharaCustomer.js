
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
    console.log("------------------------------------------------------------------------");
    //Ask the customer if they would like to make a purchase;
    var questions = [{
      name: "purchase",
      message: "Would you like to make a purchase?",
      type : "list",
      choices:["Yes","No"]
    }];
    inquirer.prompt(questions).then(function(ans){
      console.log(JSON.stringify(ans));
      if(ans.purchase == "Yes"){
        askUser();
      }else{
        console.log("Thank you for doing businees");
        connection.end();
      }
    });
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
    //console.log("Product is "+JSON.stringify(product));
    if(product.id!="" && product.quantity!=""){
      var queryString = "SELECT * FROM products WHERE id="+ product.id;
      var newStock=0;
      connection.query(queryString, function(error, response){
        if(!error){
          if( parseInt(response[0].stock)<= 0 ){
            console.log("\nThe "+response[0].product+" is out of stock! Please check again later\n");
          }else if(product.quantity>parseInt(response[0].stock)){ 
            console.log("\nInsufficient quantity to fulfil your demands.Please choose a different amount\n");
          }else{
            console.log("\nYou bought "+product.quantity+" "+response[0].product);
            console.log("Your cost is $"+parseFloat(response[0].price)*product.quantity);
            console.log("Nice doing business with you\n");
            newStock = parseInt(response[0].stock) - product.quantity;
            updateProduct(response[0].id, newStock);
          }
        }else{
          return console.log(error);
        }
        //queryString = "SELECT * FROM products"; 
        //displayItems(queryString);
        connection.end();
      });
    }else{
      console.log("Please select an item and the quantity");
      connection.end();
    }
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

