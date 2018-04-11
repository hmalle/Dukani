
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
    askSupervisor();
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

function createNewDepartment(){
  var question = [{
    type: "text",
    name: "newDepartment",
    message: "Enter the name of the new dapartment"
  }];
  inquirer.prompt(question).then(function(answer){
    console.log(JSON.stringify(answer));
  })
}

function askSupervisor(){
  //prompts the user to enter the id of the item and the quantity to buy! 
  var questions = [
  {
    type: "list",
    name: "option",
    message: "Choose what action to perform",
    choices: ["1: View Products by Department","2: Create New Department"]
  }];
  inquirer.prompt(questions).then( function(answers){
    console.log(JSON.stringify(answers));
    switch(answers.option.charAt(0)){
      case "1":
        displayItems("SELECT * FROM departments");
        break;
      case "2":
        createNewDepartment();
        break;
      //default //Not needed since we are getting a selection
    }
  });
}


