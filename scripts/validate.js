const pathUtil = require('path');
const fs = require('fs');
const {
  LANGUAGES_DIR,
  LANGUAGES
} = require('./common');
const {validateLanguage} = require('./validate-lib');

let valid = true;

const errorCallback = (error) => {
  if (process.env.DEBUG) {
    console.error(error);
  } else {
    console.error(error.message);
  }
  valid = false;
};

for (const lang of LANGUAGES) {
  console.log(`Validating ${lang}`);
  const langFile = pathUtil.join(LANGUAGES_DIR, `${lang}.json`);
  let content;
  try {
    content = fs.readFileSync(langFile, { encoding: 'utf8' });
  } catch (e) {
    errorCallback(new Error('Cannot read file, probably does not exist'));
    continue;
  }

  validateLanguage(content, errorCallback);
}

if (valid) {
  console.log('VALID');
  process.exit(0);
} else {
  console.log('INVALID');
  process.exit(1);
}
