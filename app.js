// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
// require('dotenv').config();

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    init();
});

function init(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Pick what you would like to do.',
        choices: [
            'Add departments, roles, employees',
            'View departments, roles, employees',
            'Update Employee Roles'
        ]
    }]).then(function(response){
        switch(response.action){
            case 'Add departments, roles, employees':
                return add();
            case 'View departments, roles, employees':
                return view();
            case 'Update Employee Roles':
                return update();
            default:
                console.log("Error: Nothing selected");
        }
    })
}

function add(){
    console.log("You chose to ADD")
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to add?',
        choices: [
            'Departments',
            'Roles',
            'Employees'
        ]
    }]).then(function(response){
        switch(response.action){
            case 'Departments':
                return addDep();
            case 'Roles':
                return addRole();
            case 'Employees':
                return addEmpl();
            default:
                console.log("Error: Nothing selected");
        }
    })
};

function addDep(){
    console.log("You chose to add a department");
};
function addRole(){
    console.log("You chose to add a Role");
};
function addEmpl(){
    console.log("You chose to add a Employee");
};

function selectView(table){
    var queryString = "SELECT * FROM ??";
    // console.log(queryString);
    connection.query(queryString, [table], function(err, result){
        if (err) throw err;
        console.log("\n");
        console.log(" ... Showing: " + table + " ... ");
        console.table(result);
        console.log("\n"+"\n");
    });
    init();
}

function view(){
    // console.log("You chose to VIEW")
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Which table would you like to view?',
        choices: [
            'Departments',
            'Roles',
            'Employees'
        ]
    }]).then(function(response){
        switch(response.action){
            case 'Departments':
                return viewDep();
            case 'Roles':
                return viewRole();
            case 'Employees':
                return viewEmpl();
            default:
                console.log("Error: Nothing selected");
        }
    })
};

function viewDep(){
    selectView("department");
};
function viewRole(){
    selectView("role");
};
function viewEmpl(){
    selectView("employee");
};

function update(){
    console.log("You chose to UPDATE")
};
