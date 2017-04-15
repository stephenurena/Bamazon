//load npm packages mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

////sql connection from localhost, create connection to bamazon database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "",
	database: "bamazon"
});
//response on the connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //call bamazonProducts once connection is 200
  bamazonProducts();
});

//will display list of products 
var bamazonProducts = function(){
	connection.query("SELECT * FROM products", function(err,results){
		//if error return error
		if(err) throw err;
		//display all current bamazon products to customer
		for(i = 0; i < results.length; i++){ 
			console.log("----------------------------------------------------------------------");
			console.log(" || ITEM ID: " + results[i].item_id + "\n || PRODUCT: " + results[i].product_name + "\n || DEPARTMENT: " + results[i].department_name + "\n || PRICE: $" + results[i].price.toFixed(2));
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		};
		//first prompt to ask customer to select an item, while passing results into the function
		custSelection(results);
	});
};
//function to ask customer what product he/she would like to purchase from the given list of items
var custSelection = function(results){
			inquirer.prompt(
				{
					type: "input",
					name: "idSelection",
					message: "What product would you like to buy(enter an Item number)?",
			        validate: function (id) {
					            //function to validate a selected product id, if false, will return user to enter a correct id/product value
					            var realId = false;
					            for (var i = 0; i < results.length; i++) {
					                if (id == results[i].item_id) {
					                    customerSelection = results[i];
					                    realId = true;
					                }
					            }
					            if (realId) {
					                return true;
					            }
					            else {
					                console.log("\nBummer! That isn't something we carry.\nPlease select an item id from the list");
					                return false;
					            }
		        			}
				}
		).then(function(answer) {
			console.log("Customer wants to purchase: " + customerSelection.product_name);
			//second prompt to seek amount of units to purchase
			custQuantity();

		});
};
//function to ask customer how many units they would like to purchase of their selected item
var custQuantity = function() {
				inquirer.prompt(
				{
					type: "input",
					name: "quantity",
					message: "How many units would you like to purchase?",
					validate: function (units) {
                        //function to validate the current quanitity of an item in bamazon db
                        if ((parseInt(customerSelection.stock_quantity) - parseInt(units)) >= 0) {
                            return true;
                        }
                        else {
                            console.log("\nNo Dice! We don't carry that many " + customerSelection.product_name + ". Please select a lower amount.");
                            return false;
                        }
                    }
				}
			).then(function(answer) {
				console.log("User wants " + answer.quantity + " units \n");
				//multiplies the amount of the item selected and the number of units purchased
				var total = parseFloat(customerSelection.price) * parseFloat(answer.quantity)
				total = total.toFixed(2);
				console.log("Your total is $" + total + " for " + answer.quantity + " unit(s) of " + customerSelection.product_name)

				connection.query("UPDATE products SET ? WHERE ? ", [{
                    stock_quantity: parseInt(customerSelection.stock_quantity) - parseInt(answer.quantity),
                },
                {
                    item_id: customerSelection.item_id
                }], function (err, response) {
                    if (err) throw err;
                    //performs a new query to ask if the user would like to make a new purchase
                    confirm();
                });
			});
};
//Market to customer to purchase another item,if not server will be disconnected
var confirm = function(){
	                    inquirer.prompt([
                        {
                            type: "confirm",
                            message: "Thank you for your purchase! \nWould you like to make another?",
                            name: "morePurchase"
                        }
                    ]).then(function (response) {
                        if (response.morePurchase) {
                            //if customer selects to make another purchase the inital function is called again
                            bamazonProducts();
                        }
                        else {
                            console.log("Come see us again soon!");
                            //server disconnected
                            process.exit();
                        }
                    })
}
















