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

    channel.assertQueue(queue, {
      durable: true,
    });

    // tells a worker to not consume a next message till previous one if acknowledget
    // will give a task to an another worker
    channel.prefetch(1);

    console.log(" [*] Waiting for a task in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg) {
        console.log(` [x] Started doing very hard (10s) task [${msg.content.toString()}]...`);
        
        setTimeout( () => {
            console.log(` [x] Finished the task [${msg.content.toString()}]!`);
            // acknowledge manually
            channel.ack(msg);
        }, 10000)
    }, {
        // auto message acknowledgment
        noAck: false
    });

  });
});