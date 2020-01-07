## Durable messages and acknowledgement

In Lesson_1 a message is marked received on a consumer right away after it got the message but what if our consumer got a message and died let's say in the middle of finishing that task? We would like to not mark that message as received and to achieve this manual message acknowledgment comes in handy.

Also here we use persistent messages to keep them alive on the disk even if RabbitMQ service is restarted.