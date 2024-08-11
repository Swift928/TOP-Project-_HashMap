const HashMap = require('./hashMap');

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// console.log(test.length());

test.set('jacket', 'Chief');
test.set('kite', 'Swift');
test.set('lion', 'MacBook');

test.set('moon', 'silver');

console.log(test.entries());
// console.log(test.values());

// console.log(test.length());

// test.display();

// test.set('Chief', 'silver');
// test.set('BlACK', 'silver');
// test.set('4Ever', 'silver');

// test.display();
