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

app.use(express.static(`${__dirname}/dist`))

const line = require("line-pay-sdk");
const uuid = require("uuid/v4")
const dotenv = require("dotenv");

dotenv.config();

const client = new line.Client({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecret: process.env.LINE_PAY_CHANNEL_SECRET,
});
var line_amount=1
app.use("/pay/reserve", (req, res) => {
  const options = {
    productName: "ScratchBurger",
	productImageUrl: "https://luffy.ee.ncku.edu.tw:11500/img/LOGO.png",
    amount: line_amount,
    currency: "TWD",
    orderId: uuid(),
    confirmUrl: "https://luffy.ee.ncku.edu.tw:11500/pay/confirm"
  }

  client.reservePayment(options).then((response) => {
    res.redirect(response.info.paymentUrl.web);
  });
});

app.use("/pay/confirm", (req, res) => {
  if (!req.query.transactionId){
    throw new Error("Transaction Id not found.");
  }
  const confirmation = {
    transactionId: req.query.transactionId,
    amount: line_amount,
    currency: "TWD"
  };

  client.confirmPayment(confirmation).then((response) => {
    res.send("<h1>Payment has been completed.</h1> <button onclick='window.close()'>Quit</button>");
  });
});


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

connection.query('CREATE TABLE IF NOT EXISTS Customer_info (username VARCHAR(20), password VARCHAR(20), email VARCHAR(30), fbid VARCHAR(30), fbname VARCHAR(30), login_status VARCHAR(10), balance INT, last_order1 VARCHAR(30), last_order2 VARCHAR(30), last_order3 VARCHAR(30), last_order4 VARCHAR(30), last_place VARCHAR(30), last_time VARCHAR(30), last_howtopay VARCHAR(30), last_password_number VARCHAR(10))')
connection.query('CREATE TABLE IF NOT EXISTS OrderX (order_index INT, fbid VARCHAR(30), username VARCHAR(30), item1 VARCHAR(500), n1 INT, item2 VARCHAR(500), n2 INT, item3 VARCHAR(500), n3 INT, item4 VARCHAR(500), n4 INT, item5 VARCHAR(500), n5 INT, amount INT, place VARCHAR(30), time VARCHAR(50), howtopay VARCHAR(30), password_number VARCHAR(10))')
connection.query('CREATE TABLE IF NOT EXISTS Menu (burgerA INT, burgerB INT, burgerC INT, burgerD INT)')

/*connection.query('SHOW TABLES', function (error, results, fields) {
  if (error) throw error
  console.log('There are tables: ', results)
})*/

var visitor_index=0;
app.post('/fblogin', function(req, res) {
  connection.query(`SELECT fbid FROM Customer_info WHERE fbid LIKE "${req.body.id}"`, function (error, results, fields) {
  	if (results=="") {
      if (req.body.name=="visitor") {
        visitor_index=visitor_index+1
        res.send({"id":visitor_index})
        connection.query(`INSERT INTO Customer_info (fbid, fbname, login_status, balance) VALUES ("${visitor_index}", "${req.body.name}", "IN", 10000)`)
      }
      else {
		connection.query(`SELECT email FROM Customer_info WHERE email LIKE "${req.body.email}"`, function (error, results, fields) {
			if (results=="") {
				connection.query(`INSERT INTO Customer_info (email, fbid, fbname, login_status, balance) VALUES ("${req.body.email}", "${req.body.id}", "${req.body.name}", "IN", 10000)`)
			}
			else {
				connection.query(`UPDATE Customer_info SET fbid = '${req.body.id}' WHERE email LIKE "${req.body.email}"`)
				connection.query(`UPDATE Customer_info SET fbname = '${req.body.name}' WHERE email LIKE "${req.body.email}"`)
				connection.query(`UPDATE Customer_info SET login_status = 'IN' WHERE email LIKE "${req.body.email}"`)
			}
		})
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

app.post('/fbget', function(req, res) {
	connection.query(`SELECT * FROM Customer_info WHERE fbid LIKE "${req.body.id}"`, function (error, results, fields) {
    res.send(results); 
  })
})

app.post('/selfownget', function(req, res) {
	connection.query(`SELECT * FROM Customer_info WHERE username LIKE "${req.body.name}"`, function (error, results, fields) {
    res.send(results); 
  })
})

var order_index=0;
app.post('/order', function(req, res) {
  order_index=order_index+1 
  if (req.body.howtopay==="line") {
	  line_amount=req.body.amount;
  }
	if (req.body.id==="selfown") {
		connection.query(`INSERT INTO OrderX (order_index, username, item1, n1, item2, n2, item3, n3, item4, n4, item5, n5, place, time, howtopay, amount, password_number) VALUES ("${order_index}", "${req.body.name}", 
			"${req.body["item[]"][0]}", ${req.body["number[]"][0]}, "${req.body["item[]"][1]}", ${req.body["number[]"][1]}, "${req.body["item[]"][2]}", ${req.body["number[]"][2]},
			"${req.body["item[]"][3]}", ${req.body["number[]"][3]}, "${req.body["item[]"][4]}", ${req.body["number[]"][4]}, 
			"${req.body.place}", "${req.body.time}", "${req.body.howtopay}", ${req.body.amount}, "${req.body.password_number}")`)
		if (req.body.howtopay==="wallet") {			
			connection.query(`SELECT balance FROM Customer_info WHERE username LIKE "${req.body.name}"`, function (error, results, fields) {
				balance=results[0].balance-req.body.amount;    
				console.log(balance);
				connection.query(`UPDATE Customer_info SET balance = ${balance} WHERE username LIKE "${req.body.name}"`)
			})
		}
		connection.query(`UPDATE Customer_info SET last_place = "${req.body.place}" WHERE username LIKE "${req.body.name}"`)
		connection.query(`UPDATE Customer_info SET last_time = "${req.body.time}" WHERE username LIKE "${req.body.name}"`)
		connection.query(`UPDATE Customer_info SET last_howtopay = "${req.body.howtopay}" WHERE username LIKE "${req.body.name}"`)
		connection.query(`UPDATE Customer_info SET last_password_number = "${req.body.password_number}" WHERE username LIKE "${req.body.name}"`)		
	}
	else {
		connection.query(`INSERT INTO OrderX (order_index, fbid, item1, n1, item2, n2, item3, n3, item4, n4, item5, n5, place, time, howtopay, amount, password_number) VALUES ("${order_index}", "${req.body.id}", 
			"${req.body["item[]"][0]}", ${req.body["number[]"][0]}, "${req.body["item[]"][1]}", ${req.body["number[]"][1]}, "${req.body["item[]"][2]}", ${req.body["number[]"][2]},
			"${req.body["item[]"][3]}", ${req.body["number[]"][3]}, "${req.body["item[]"][4]}", ${req.body["number[]"][4]}, 
			"${req.body.place}", "${req.body.time}", "${req.body.howtopay}", ${req.body.amount}, "${req.body.password_number}")`)
		if (req.body.howtopay==="wallet") {			
			connection.query(`SELECT balance FROM Customer_info WHERE fbid LIKE "${req.body.id}"`, function (error, results, fields) {
				balance=results[0].balance-req.body.amount;    
				console.log(balance);
				connection.query(`UPDATE Customer_info SET balance = ${balance} WHERE fbid LIKE "${req.body.id}"`)
			})
		}
		connection.query(`UPDATE Customer_info SET last_place = "${req.body.place}" WHERE fbid LIKE "${req.body.id}"`)
		connection.query(`UPDATE Customer_info SET last_time = "${req.body.time}" WHERE fbid LIKE "${req.body.id}"`)
		connection.query(`UPDATE Customer_info SET last_howtopay = "${req.body.howtopay}" WHERE fbid LIKE "${req.body.id}"`)
		connection.query(`UPDATE Customer_info SET last_password_number = "${req.body.password_number}" WHERE fbid LIKE "${req.body.id}"`)
	}
})

app.post('/history', function(req, res) {
	if (req.body.id==="selfown") {
		connection.query(`UPDATE Customer_info SET last_order${req.body.burger} = "${req.body.last}" WHERE username LIKE "${req.body.name}"`)
	}
	else {
		connection.query(`UPDATE Customer_info SET last_order${req.body.burger} = "${req.body.last}" WHERE fbid LIKE "${req.body.id}"`)
	}
})

app.post('/signup', function(req, res) {	
	connection.query(`SELECT username FROM Customer_info WHERE username LIKE "${req.body.name}"`, function (error, results, fields) {
		if (results!="") {
			res.send("此Username已被註冊");
		}
		else {
			connection.query(`SELECT email FROM Customer_info WHERE email LIKE "${req.body.email}"`, function (error, results, fields) {
				if (results=="") {
					connection.query(`INSERT INTO Customer_info (username, password, email, login_status, balance) VALUES ("${req.body.name}", "${req.body.password}", "${req.body.email}", "IN", 10000)`)
					res.send("註冊成功");
				}
				else {
					connection.query(`SELECT username FROM Customer_info WHERE email LIKE "${req.body.email}"`, function (error, results, fields) {
						if (results[0].username!=null) {
							res.send("此E-mail已被註冊");
						}
						else {
							connection.query(`UPDATE Customer_info SET username = '${req.body.name}' WHERE email LIKE "${req.body.email}"`)
							connection.query(`UPDATE Customer_info SET password = '${req.body.password}' WHERE email LIKE "${req.body.email}"`)
							connection.query(`UPDATE Customer_info SET login_status = 'IN' WHERE email LIKE "${req.body.email}"`)
							res.send("註冊成功");												
						}
					})
				}
			})
		}
	})
})

app.post('/signin', function(req, res) {
	connection.query(`SELECT username FROM Customer_info WHERE email LIKE "${req.body.email}" AND password LIKE "${req.body.password}"`, function (error, results, fields) {
		if (typeof(results)=="undefined" || results=="") {
			res.send("登入失敗");
		}
		else {
			res.send(["登入成功", results[0].username]);
		}
	})
})
