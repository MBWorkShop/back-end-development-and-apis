const assert = require("assert");
const { isPrime } = require("./index.js");

assert.strictEqual(isPrime(2), true);
assert.strictEqual(isPrime(3), true);
assert.strictEqual(isPrime(5), true);

assert.strictEqual(isPrime(4), false);
assert.strictEqual(isPrime(9), false);
assert.strictEqual(isPrime(10), false);

console.log("All tests passed!");