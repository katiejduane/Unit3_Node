// Like Python, you can fetch modules (ex: pygame from pip); dateTime, etc...

// Some examples of modules native to NODE; ways of looking up info about our comp's OS
const os = require('os'); //instead of 'import' in python, we use 'require' in node
// console.log(os)

const cpus = os.cpus();
// console.log(cpus);

const memoryAvail = os.freemem();
// console.log(memoryAvail);

const nI = os.networkInterfaces();
// console.log(nI);