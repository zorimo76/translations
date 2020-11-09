const fs = require('fs');

const fileName = process.argv[2];
const fileContent = fs.readFileSync(fileName, 'utf8');

console.log(fileContent);
