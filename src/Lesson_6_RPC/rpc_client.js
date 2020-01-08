const amqp = require('amqplib/callback_api');

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }

      // correlationId is a property which allows us to get if the message belongs the same call
      // in case the rpc_server died before acknowlegement and run a procedure again
      const correlationId = generateUuid();
      const num = parseInt(args[0]);

      console.log(' [x] Requesting fib(%d)', num);

      // consume the result of the procedure
      channel.consume(q.queue, function(msg) {
        // check if message belongs to the call
        // imagine running multiple messages to this queue, it will help the rpc_server know what response belongs to what call
        if (msg.properties.correlationId == correlationId) {
          console.log(' [.] Got %s', msg.content.toString());
          setTimeout(function() { 
            connection.close(); 
            process.exit(0) 
          }, 500);
        }
      }, {
        noAck: true
      });

      channel.sendToQueue('rpc_queue', Buffer.from(num.toString()), { 
        correlationId: correlationId, 
        // replyTo is a property which will let the rpc_server know what queue should it return the response to
        replyTo: q.queue 
      });

    });
  });
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}