const fs = require('fs');
const pathUtil = require('path');

const YAML = require('./yaml');
const {
  LANGUAGES_DIR,
  LANGUAGES,
  OUT_DIR
} = require('./common');
const {validateLanguage} = require('./validate-lib');

let valid = true;
const validateErrorCallback = (error) => {
  console.error(error.message);
  valid = false;
};

const readLanguage = (lang) => {
  const languageFile = pathUtil.join(LANGUAGES_DIR, `${lang}.yaml`);
  const content = fs.readFileSync(languageFile, { encoding: 'utf8' });
  validateLanguage(content, validateErrorCallback);
  const parsedMessages = YAML.parse(content, {
    prettyErrors: true
  });
  const result = {};
  for (const key of Object.keys(parsedMessages)) {
    const value = parsedMessages[key];
    const message = value.message;
    const englishMessage = value.englishMessage;
    // Do not write missing messages, or messages that are identical to their English translation.
    if (message && message !== englishMessage) {
      result[key] = message;
    }
  }
  return result;
};

const result = {
  '__README__': 'Imported from https://github.com/TurboWarp/translations -- DO NOT EDIT BY HAND'
};

for (const lang of Object.keys(LANGUAGES)) {
  console.log(`Processing ${lang}`);
  const processed = readLanguage(lang);
  result[lang] = processed;
}

console.log('Writing');
fs.writeFileSync(pathUtil.join(OUT_DIR, 'translations.json'), JSON.stringify(result, null, 4));

if (!valid) {
  console.log('INVALID');
  process.exit(1);
}
