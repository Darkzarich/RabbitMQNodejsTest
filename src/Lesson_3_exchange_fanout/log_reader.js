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

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    // empty queue name will generate a random one
    channel.assertQueue('', {
      // exclusive set to true means that the queue will be deleted after connection is closed
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

      // binding queue to an exchange, randomly generated name is in q.queue
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        if(msg.content) {
          console.log(" [x] %s", msg.content.toString());
        }
      }, {
        noAck: true
      });
    });
  });
});