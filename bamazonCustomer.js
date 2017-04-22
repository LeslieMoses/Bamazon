var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3305,
    // My username
    user: "root",
    // Your password
    password: "root",
    // connecting to bamazon dbase
    database: "bamazon"
});
// once connected, run this function?
connection.connect(function(err) {
    // show error if error occurs
    if (err) throw err;
    // print the threadId (?) connection 
    console.log("connected as id " + connection.threadId);
    // greet user
    console.log("\n Welcome to Bamazon!\n ");
});
// res = result
// code that prints all products from database to terminal.
connection.query("SELECT * FROM products", function(err, res) {


    // loop to retrieve each item
    for (var i = 0; i < res.length; i++) {
        // print each item ID, each product name, department and price
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);

    }
    // a lil' formatting going on:
    console.log("-----------------------------------");

    // now for inquirer...
    // moved INSIDE sql function because inquirer kept appearing BEFORE product list 
    var inquirer = require("inquirer");
    //1st promt seeks product ID from user
    var questions = [{
            type: "input",
            name: "product",
            message: "Ready to buy? \nPlease enter the product’s ID:"
        },
        //2nd promt seeks product amount from user
        {
            type: "input",
            name: "amount",
            message: "Thanks! \nAnd how many would you like to buy?"
        }
    ];

    inquirer.prompt(questions)
        // after questions, returning response
        .then(function(answers) {
            // showing response in an obj
            console.log(JSON.stringify(answers, null, '  '));
            // further breaking down inquirer answers
            console.log("Product or 'product_name'= " + answers.product);
            console.log("Amt the user wants or the amt to subtract from 'stock_quantity'= " + answers.amount);
            // console.log("testing res: " + res.product_name);

            // hannah'scode
            // var query = "SELECT product_name, stock_quantity FROM products WHERE ?";
            // connection.query(query, { products_name: answers.product_name }, function(err, res) {
            //     for (var i = 0; i < res.length; i++) {
            //         console.log("???: " + res[i].products_name + " || dlsdf: " + res[i].item_id + " || Year: " + res[i].department_name);
            //     }
            //     runSearch();
            // });
            // ...................
            // connection.query("UPDATE products SET stock_quantity = 30 WHERE item_id = 2", function(err, res) {
            //     // show error if error occurs
            //     if (err) throw err;
            //     console.log(res);

            // res = result
            // code that prints all products from database to terminal.
            // connection.query("SELECT * FROM products", function(err, res) {
            //     console.log(answer.product);
            //     // loop to retrieve each item
            //     for (var i = 0; i < res.length; i++) {
            //         // print each item ID, each product name, department and price
            //         console.log(res[i].stock_quantity + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
            //     }
            // more formatting:
            console.log("-----------------------------------");

        });
});