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
    let msgObj = {};
    let totalMsg = 25;

    channel.assertQueue(queue, {
      durable: false
    });

    for (let i = 0; i < totalMsg; i++) {
      msgObj = {
        msg: `msg${i}`,
        sendTime: 0,
      };

      setTimeout(function(msgObj) { 
        const now = new Date().getTime();
        msgObj.sendTime = now;
        console.log(` [${msgObj.msg}] send time: `, now);

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgObj)));

        if (i === totalMsg - 1) {
          connection.close();
          process.exit(0);
        }
      }, Math.floor(Math.random()*4000), msgObj);
    }
  });
});

