const fs = require('fs');
const pathUtil = require('path');

module.exports = {
  IN_DIR: pathUtil.join(__dirname, '../in'),
  OUT_DIR: pathUtil.join(__dirname, '../out'),
  LANGUAGES_DIR: pathUtil.join(__dirname, '../languages'),
  LANGUAGES: [
    'ab',
    'am',
    'ar',
    'az',
    'be',
    'bg',
    'ca',
    'ckb',
    'cs',
    'cy',
    'da',
    'de',
    'el',
    'en',
    'es-419',
    'es',
    'et',
    'eu',
    'fa',
    'fi',
    'fr',
    'ga',
    'gd',
    'gl',
    'he',
    'hr',
    'ht',
    'hu',
    'hy',
    'id',
    'is',
    'it',
    'ja-Hira',
    'ja',
    'ka',
    'km',
    'ko',
    'ku',
    'lt',
    'lv',
    'mi',
    'mn',
    'nb',
    'nl',
    'nn',
    'pl',
    'pt-br',
    'pt',
    'rap',
    'ro',
    'ru',
    'sk',
    'sl',
    'sr',
    'sv',
    'sw',
    'th',
    'tr',
    'uk',
    'uz',
    'vi',
    'zh-cn',
    'zh-tw',
    'zu',
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
