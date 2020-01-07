## Fanout exchange

Producers almost never send message directly to a queue instead they send it to an exchange and exchanges are binded to queue. 
There are different types of exchanges but in this particular lesson we care about `fanout` type which tells exchange to send message to every binded queue.
If no queue is binded at the time then a message is discarded.