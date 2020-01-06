let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    let queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg) {
        const parsedMsg = JSON.parse(msg.content.toString());
        console.log('consume time produce time difference: ', parsedMsg.sendTime - new Date().getTime());
        console.log(" [x] Received %s", parsedMsg.msg);
    }, {
        noAck: true
    });

  });
});