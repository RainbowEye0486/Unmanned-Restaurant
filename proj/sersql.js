#!/usr/bin/env node

const express = require('express')
const app = express()
const fs = require('fs')
const config= require('./config')
const port = config.port
const https = require('https')
const mysql = require('mysql')
const connection = mysql.createConnection(config.mysql)
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connection.connect(err => {
  if (err) {
    console.log('fail to connect:', err)
    process.exit()
  }
})

app.use(express.static(`${__dirname}/dist`))

options = {
  ca : fs.readFileSync(config.ssl.ca),
  key: fs.readFileSync(config.ssl.key),
  cert:fs.readFileSync(config.ssl.cert)
}

https.createServer(options, app).listen(port,()=>{
    console.log(`listen on port:${port}`)
})

connection.query('CREATE TABLE IF NOT EXISTS Customer_info (fbid VARCHAR(30), fbname VARCHAR(30), login_status VARCHAR(10), balance INT, last_order1 VARCHAR(30), last_order2 VARCHAR(30), last_order3 VARCHAR(30), last_order4 VARCHAR(30), last_place VARCHAR(30))')
connection.query('CREATE TABLE IF NOT EXISTS OrderX (order_index INT, fbid VARCHAR(30), item1 VARCHAR(500), n1 INT, item2 VARCHAR(500), n2 INT, item3 VARCHAR(500), n3 INT, item4 VARCHAR(500), n4 INT, item5 VARCHAR(500), n5 INT, time DATETIME, place VARCHAR(30), amount INT)')
connection.query('CREATE TABLE IF NOT EXISTS Menu (burgerA INT, burgerB INT, burgerC INT, burgerD INT)')

/*connection.query('SHOW TABLES', function (error, results, fields) {
  if (error) throw error
  console.log('There are tables: ', results)
})*/
var visitor_index=0;
app.post('/login', function(req, res) {
	connection.query(`SELECT fbid FROM Customer_info WHERE fbid LIKE "${req.body.id}"`, function (error, results, fields) {
  	if (results=="") {
      if (req.body.name=="visitor") {
        visitor_index=visitor_index+1
        res.send({"id":visitor_index})
        connection.query(`INSERT INTO Customer_info (fbid, fbname, login_status, balance) VALUES ("${visitor_index}", "${req.body.name}", "IN", 10000)`)
      }
      else {
        connection.query(`INSERT INTO Customer_info (fbid, fbname, login_status, balance) VALUES ("${req.body.id}", "${req.body.name}", "IN", 10000)`)
		  }
    }
    else {
      connection.query(`UPDATE Customer_info SET login_status = 'IN' WHERE fbid LIKE "${req.body.id}"`)
    }
	})
})

app.post('/logout', function(req, res) {
	connection.query(`UPDATE Customer_info SET login_status = 'OUT' WHERE fbid LIKE "${req.body.id}"`)
})

app.post('/getstatus', function(req, res) {
	connection.query(`SELECT login_status FROM Customer_info WHERE fbid LIKE "${req.body.id}"`, function (error, results, fields) {
    res.send(results); 
  })
})

var order_index=0;
app.post('/order', function(req, res) {
  order_index=order_index+1 
  connection.query(`INSERT INTO OrderX (order_index, fbid, item1, n1, item2, n2, item3, n3, item4, n4, item5, n5, time, place, amount) VALUES ("${order_index}", "${req.body.id}", 
        "${req.body["item[]"][0]}", ${req.body["number[]"][0]}, "${req.body["item[]"][1]}", ${req.body["number[]"][1]}, "${req.body["item[]"][2]}", ${req.body["number[]"][2]},
        "${req.body["item[]"][3]}", ${req.body["number[]"][3]}, "${req.body["item[]"][4]}", ${req.body["number[]"][4]}, "${req.body.time}", "${req.body.place}", ${req.body.amount})`)
  connection.query(`SELECT balance FROM Customer_info WHERE fbid LIKE "${req.body.id}"`, function (error, results, fields) {
    balance=results[0].balance-req.body.amount;
    connection.query(`UPDATE Customer_info SET balance = ${balance} WHERE fbid LIKE "${req.body.id}"`)
  })
})

app.post('/history', function(req, res) {
	connection.query(`UPDATE Customer_info SET last_order${req.body.burger} = "${req.body.last}" WHERE fbid LIKE "${req.body.id}"`)
})

app.post('/gethistory', function(req, res) {
	connection.query(`SELECT last_order${req.body.burger} FROM Customer_info WHERE fbid LIKE "${req.body.id}"`, function (error, results, fields) {
    res.send(results); 
  })
})
