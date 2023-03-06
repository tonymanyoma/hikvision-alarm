const redis = require("redis");


const client = redis.createClient({
    host: '127.0.0.1',
    port: 6479
});


client.connect();

client.on('connect', function() {
  console.log('redis connected');
});






module.exports = client; 