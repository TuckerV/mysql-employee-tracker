// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

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

function insertInto(table, response){
    var queryString = "INSERT INTO ?? SET ?";

    connection.query(queryString, [table, response], function(err, result){
        if (err) throw err;
        // console.log(" ... ADDED ...")
    });
    init();
}

function addDep(){
    console.log("You chose to add a department");
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: "Please type the department name: "
    }
    ]).then(function(response){
        insertInto("department", response);
    })
};
function addRole(){
    console.log("You chose to add a Role");
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: "Please input role title: "
    },
    {
        type: 'input',
        name: 'salary',
        message: "Please input role salary: "
    },
    {
        type: 'input',
        name: 'department_id',
        message: "Please input department id: "
    }
    ]).then(function(response){
        insertInto("role", response);
    })
};
function addEmpl(){
    console.log("You chose to add a Employee");
    inquirer.prompt([{
        type: 'input',
        name: 'first_name',
        message: "Employee first name: "
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Employee last name: "
    },
    {
        type: 'input',
        name: 'role_id',
        message: "Employee role id: "
    },
    {
        type: 'input',
        name: 'manager_id',
        message: "Employee manager id: "
    }
    ]).then(function(response){
        insertInto("employee", response);
    })
};

function selectView(table){
    var queryString = "SELECT * FROM ??";
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
    // console.log("You chose to UPDATE")
    inquirer.prompt([{
        type: 'input',
        name: 'role_id',
        message: "New Role id you wish to give employee: "
    },
    {
        type: 'input',
        name: 'first_name',
        message: "Name of employee you wish to update to new role: " 
    }
    ]).then(function(response){
        var queryString = "UPDATE employee SET role_id = ? WHERE first_name = ?";
        // console.log(response);
        connection.query(queryString, [response.role_id, response.first_name], function(err, result){
            if (err) throw err;
            // console.log(response);
        });
        init();
    })
};
