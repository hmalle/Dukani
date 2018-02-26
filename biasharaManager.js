
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
    askManager();
  }
});

function lowInventory(){
}

function replenishStock(){
}

function addNewItem(){
  console.log("You are about to add a new item to the store inventory!");
  var questions=[
    {
      name:"product",
      message:"Enter the name of the product",
    },{
      name:"department",
      mesage:"Enter the name of the department",
    },{
      name:"price",
      message:"Enter the price of the item in $"
    },{
      name:"quantity",
      message:"Enter the quantity of the new item"
    }];
    inquirer.prompt(questions).then(function(answers){
      var queryString = "INSERT INTO  products(product, department, price, stock) "
      queryString+= "VALUES('"+anwers.product+','+answers.department+','+answers.price+","+answers.quantity+,'"';
      console.log(queryString);//TODO: delete this
      connection.query(queryString,function(error,response){
        if(error){
          return console.log(error);
        }else{
          console.log("Item added to the database");
        }
      });
    });
}



function askManager(){
  //prompts the user to enter the id of the item and the quantity to buy! 
  var questions = [
  {
    type: "list",
    name: "option",
    message: "Choose what action to perform",
    choices: ["1: view products for sale","2: view low inventory","3: add to existing inventory","4: add a new product"]
  }];
  inquirer.prompt(questions).then( function(answers){
    console.log(JSON.stringify(answers));
    switch(answers.option.charAt(0)){
      case "1":
        displayItems("SELECT * FROM products");
        break;
      case "2":
        lowInventory();
        break;
      case "3":
        replenishStock();
        break;
      case "4":
        addNewItem();
        break;
      //default //Not needed since we are getting a selection
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

function displayItems( queryString ){
  //display items based on the query supplied! 
  connection.query( queryString, function(error,res){
    if(error){
      console.log(error);
    }else{
      console.log(columnify(res));
    }
    console.log("-------------------------------------------------------------------------------");
  });
}

