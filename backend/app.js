const express = require('express')
var bodyParser = require("body-parser");
var app = express();

const devDatabase  = require('./dev-database.json');
const testDatabase  = require('./test-database.json');

let database = devDatabase;

if (process.env['ENV'] === 'test') {
    database =  testDatabase;
    console.log('>>>>>>>>>>>>>>>>>>>>> Running in with TEST DATBASE <<<<<<<<<<<<<<<<<<<<<<<<');
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const getSize = (customer) => {
    return customer.employees <= 100 ? "Small" : customer.employees < 1000 ? "Medium" : "Big";
}

app.post('/', (req, res) => {
    const name = req.body.name;
    const response = {
        name, 
        timestamp: (new Date()).toDateString(),
        customers: database.customers.map(customer => {
            customer.size = getSize(customer)
            return customer;
        })
    };
    res.set('Access-Control-Allow-Origin', '*')
    return res.json(response);
});
module.exports = app;



