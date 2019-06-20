var redis = require("redis");
var publisher = redis.createClient();

for(let i = 0; i < 150; i++){
    publisher.publish("notification", "{\"firstname\": \"NmaeAndName\", \"lastname\": \"LastnameAndLastname\", \"age\": 99}", function(){
        process.exit(0);
    });
}