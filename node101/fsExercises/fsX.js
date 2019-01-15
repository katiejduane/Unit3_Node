const fs = require('fs')

//READFILE (asynchronous)
fs.readFile('serious.html', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data.toUpperCase())
})

//READFILESYNC (synchronous)
const readSync = fs.readFileSync(process.argv[2], 'utf8')
console.log(readSync.toUpperCase())



//WRITEFILE(asynchronous)
const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile('serious.html', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

//WRITEFILESYNC(synchronous)