// a callback is a function for some other function to run;
// a function to be called after by another function.

// in JS, functions are first-class objects. That means...
// you can do almost anything with a function that you can do with any object.
// -pass them around
// -assign it to a variable
// -over-write it

const myFunction = function(n) {
    console.log(n);
}

function myOtherFunction(callback) {
    callback('cowgirls like daisies');
}

myOtherFunction(myFunction);
