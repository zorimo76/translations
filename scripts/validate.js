const fs = require('fs');
const pathUtil = require('path');
const {
  LANGUAGES_DIR,
  LANGUAGES
} = require('./common');

const isObject = (val) => typeof val === 'object' && val !== null && !Array.isArray(val);

const validateLanguage = (lang, errorCallback) => {
  const langFile = pathUtil.join(LANGUAGES_DIR, `${lang}.json`);
  if (!fs.existsSync(langFile)) {
    errorCallback(new Error('Does not exist'));
    return;
  }

  const content = fs.readFileSync(langFile, { encoding: 'utf8' });

  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (e) {
    errorCallback(new Error(`Invalid JSON: ${e.message}`));
    return;
  }

  if (!isObject(parsedContent)) {
    errorCallback(new Error(`Not an Object`));
  }

  for (const key of Object.keys(parsedContent)) {
    try {
      const value = parsedContent[key];
      validateMessage(key, value);
    } catch (err) {
      errorCallback(err);
    }
  }
};

const validateMessage = (key, value) => {
  if (!key.startsWith('tw.')) {
    throw new Error(`${key}: Does not start with tw.`);
  }

  if (!isObject(value)) {
    throw new Error(`${key}: Not an object`);
  }
  const valueKeys = Object.keys(value);

  if (!valueKeys.includes('message')) {
    throw new Error(`${key}: Missing "message"`);
  }
  if (typeof value.message !== 'string' && value.message !== null) {
    throw new Error(`${key}: Invalid "message" (not null or string)`);
  }

  if (!valueKeys.includes('description')) {
    throw new Error(`${key}: Missing "description"`)
  }
  if (typeof value.description !== 'string') {
    throw new Error(`${key}: Invalid "description"`);
  }

  if (!valueKeys.includes('defaultMessage')) {
    throw new Error(`${key}: Missing "defaultMessage"`);
  }
  if (typeof value.defaultMessage !== 'string') {
    throw new Error(`${key}: Invalid "defaultMessage"`);
  }

  if (valueKeys.length !== 3) {
    throw new Error(`${key}: Has extra properties`);
  }

  if (value.message !== null) {
    const defaultMessageVariables = value.defaultMessage.match(/{\w+}/g);
    const defaultMessageVariableCount = defaultMessageVariables === null ? 0 : defaultMessageVariables.length;
    const messageVariables = value.message.match(/{\w+}/g);
    const messageVariablesCount = messageVariables === null ? 0 : messageVariables.length;

    if (defaultMessageVariableCount !== messageVariablesCount) {
      throw new Error(`${key}: Incorrect number of variables: expected ${defaultMessageVariableCount} but found ${messageVariablesCount}`);
    }

    for (let i = 0; i < messageVariablesCount; i++) {
      if (defaultMessageVariables[i] !== messageVariables[i]) {
        throw new Error(`${key}: Incorrect variables: expected ${defaultMessageVariables[i]} but found ${messageVariables[i]}`);
      }
    }
  }
};

let valid = true;

for (const lang of LANGUAGES) {
  console.log(`Validating ${lang}`);
  validateLanguage(lang, (error) => {
    if (process.env.DEBUG) {
      console.error(error);
    } else {
      console.error(error.message);
    }
    valid = false;
  });
}

if (valid) {
  console.log('VALID');
  process.exit(0);
} else {
  console.log('INVALID');
  process.exit(0);
}
