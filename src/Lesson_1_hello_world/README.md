## Hello World (modified)

It's slightly modified version of [https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html). It sends random amount of message (max 25) with random intervals on producer and shows the difference between send and consume time on the consumer in order to see how fast it is. 

You can open multiple consumer instances to see how Round-robin algorithm will spread messages between them.