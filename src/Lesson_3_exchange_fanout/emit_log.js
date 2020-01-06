let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    let exchange = 'logs';
    let msg = process.argv.slice(2).join(' ') || 'Hello World!';

    // messages now go to the exchange 
    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    // publish to the exchange
    // empty string is routing key and it's ignored for fanout type of exchange
    channel.publish(exchange, '', Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0); 
  }, 500);
});