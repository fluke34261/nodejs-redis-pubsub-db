var redis = require("redis");
var mysql = require('mysql');

var subscriber = redis.createClient();

var con = mysql.createConnection({
    host: "yourdbhost",
    user: "yourdbuser",
    password: "yourdbpassword",
    database: "yourdbname"
  });

con.connect(function(err) {
console.log("Connected!");
if (err) throw err;

    subscriber.on("message", function (channel, message) {
        let data = JSON.parse(message);

        var sql = "INSERT INTO customer (firstname, lastname, age) \
                    SELECT CONCAT('" + data.firstname + "', (SELECT COUNT(*) FROM customer) ) as firstname, '"+ data.lastname +"' as lastname, " + data.age +" as age";

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });


    });

});
subscriber.subscribe("notification");