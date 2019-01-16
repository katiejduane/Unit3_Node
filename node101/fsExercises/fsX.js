const fs = require('fs')

// READFILE (asynchronous)
// err and data (or error and contents, or whatever) are always sent
fs.readFile('serious.html', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data.toUpperCase())
})

// another way to not get the binary data from 'buffer', is to cast the contents/data into a string
fs.readFile('serious.html', (err, data) => {
    console.log(data.toString())
})

// READFILESYNC (synchronous)
// process.argv[index] is what index you want it to read! 
// (for instance, when you run this in the CLI, index 0 is 'node', so it will print NODE, which is not desireable...)
const readSync = fs.readFileSync(process.argv[2], 'utf8')
console.log(readSync.toUpperCase())



// WRITEFILE(asynchronous)
const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile('serious.html', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

// WRITEFILESYNC(synchronous)