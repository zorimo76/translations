const fs = require('fs');

const fileName = process.argv[2];
const fileContent = fs.readFileSync(fileName, 'utf8');
const lines = fileContent.split('\n');
let valid = true;
let currentFile = '?';

for (var i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  if (!line.startsWith('+') && !line.startsWith('-')) {
    continue;
  }
  if (line.startsWith('+++') || line.startsWith('---')) {
    currentFile = line.substr(6);
    continue;
  }
  if (!line.includes('message:')) {
    console.error(`${currentFile} unexpectedly changed something other than message:`);
    valid = false;
  }
}

if (!valid) {
  process.exit(1);
}
