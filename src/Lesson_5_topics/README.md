## Topics

Sometimes we may need more powerful routing than just `direct` here is when `topic` exchange type comes in handy. Basically, it's possible to set a pattern as routing key. There are few things to mention:

1. words in routing key are separated with dots.
2. \* (star) can substitute for exactly one word.
3. \# (hash) can substitute for zero or more words.

A few valid routing key examples: `stock.usd.nyse`, `nyse.vmw`, `quick.orange.rabbit`

### Example of use:

Imagine that we decided that our messages will be about animals and our routing keys will have this model `<speed>.<colour>.<species>`.
We also have two queues: Q1 and Q2. Then we created three bindings: Q1 is bound with binding key `*.orange.*` and Q2 with `*.*.rabbit` and `lazy.#`.

That will mean the following statements:

- Q1 will care only about **orange** animals
- Q2 will care about **any rabbits** **and** about any **lazy animals**

so, the following will happen based on this rule:

- a message with routing key `quick.orange.rabbit` will be sent to both queues
- a message with routing key `lazy.orange.elephant` will also be sent to both queues
- a message with routing key `quick.orange.fox` will be sent **only to Q1**
- a message with routing key `lazy.brown.fox` will be sent **only to Q2**
- a message with routing key `lazy.pink.rabbit` will be also **sent to Q2** (and will be delivered only **once despite matching both of rules**)
- a message with routing key `quick.brown.fox` **will be lost** because it doesn't match any rule

If our routing key will have more than 3 words it still can match the rule.