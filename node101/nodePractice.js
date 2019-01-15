//One
function greet(name) {
    console.log("Howdy, " + name)
}


function reject(name) {
    console.log("Go to hell, " + name)
}


function getPerson(callback){
    callback("Ian!")
}

getPerson(greet)
getPerson(reject)

function mean(name) {
    console.log("Piss off," + name)
}

function greetPerson(callback) {
    callback(" Rob")
}

greetPerson(mean);

//Two
fruits = ['apple', 'banana', 'orange']

function juice(fruits) {
    console.log(fruits[0] + " juice is yummy!")
}

juice(fruits);
console.log(typeof fruits)

//Three
function findEvens(array) {
    let evens = [];
    for (let i = 0; i < array.length + 1; i++) {
        if (i % 2 === 0) {
           evens.push(i)
        }
    } 
    return evens
}

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
function findElement(array, callback) {
    return callback(array)

}

console.log(findElement(nums, findEvens))

// how the 'forEach' method uses callback functions
// x = [1,2,3,4];
// x.forEach((n)=>{
//     console.log(n)
// })

// Array.prototype.forEach = function(callback){
//     for(let i = 0; i < Array.length; i++){
//         callback(Array[i]);
//     }
// }

// three B
students = ["Katie", "Sean", "Jason", "Connor"];
function findName(element) {
    if (element = "Katie") {
        return element
    }
}

console.log(students.indexOf("Sean"))
console.log(students.findIndex(findName));

const x = 3;
const y = 5;

function squareIt(number, callback) {
    // doStuff...
    //  console.log(callback(x,y)**2);
    let square = number ** 2;
    return callback(square)
}

function triple(something) {
    return something * 3;
}

function multiplyEm(a, b) {
    return a * b;
}

let num = multiplyEm(3, 5);
let result = squareIt(num, triple);
console.log(result);

// to RETURN something means