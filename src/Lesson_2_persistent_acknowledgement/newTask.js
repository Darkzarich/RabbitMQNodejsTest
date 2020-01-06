let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
        throw error1;
    }
    let queue = 'lesson2_task_queue';
    let msg = 'start new task';

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true,
    });

    setTimeout( () => {
      connection.close();
      process.exit(0);
    }, 500)

  });
});

