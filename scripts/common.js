const fs = require('fs');
const pathUtil = require('path');

module.exports = {
  IN_DIR: pathUtil.join(__dirname, '../in'),
  OUT_DIR: pathUtil.join(__dirname, '../out'),
  LANGUAGES_DIR: pathUtil.join(__dirname, '../languages'),
  LANGUAGES: [
    'es',
    'ja'
  ]
};

if (!fs.existsSync(module.exports.IN_DIR)) {
  fs.mkdirSync(module.exports.IN_DIR);
}

if (!fs.existsSync(module.exports.OUT_DIR)) {
  fs.mkdirSync(module.exports.OUT_DIR);
}

if (!fs.existsSync(module.exports.LANGUAGES_DIR)) {
  fs.mkdirSync(module.exports.LANGUAGES_DIR);
}
