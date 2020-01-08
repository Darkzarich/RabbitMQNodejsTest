const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = 'rpc_queue';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.prefetch(1);

    console.log(' [x] Awaiting RPC requests');

    channel.consume(queue, function reply(msg) {
      const n = parseInt(msg.content.toString());

      console.log(" [.] fib(%d)", n);

      const r = fibonacci(n);

      channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
        // will let the client differ which call the message belonged to
        correlationId: msg.properties.correlationId
      });

      channel.ack(msg);
    });
  });
});

// out procedure we run remotely and return the asnwer to the producer
// note: not the best fibonacci realisation
function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}