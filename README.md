# Work in progress

# Translations

## Scope

This repository is for translating strings added by TurboWarp. Scratch translations are not part of this repository.

## Submitting translations

### Requirements

 * You must be fluent in both English and another language. Taking one year of a language class in high school does not make you "fluent".
 * Machine translations (Google Translate, DeepL, etc.) are not allowed.

### Writing translations

First, make a fork of this repository. You can do everything here from the GitHub website. You do not need to clone the repository if you don't want to.

Then, go into the `languages` folder and find the file for your language. This is the two-letter code given to your language. Spanish is `es`, Japanese is `ja`, etc. If you're not sure what language code to look for, look under the "639-1" column here for your language here: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

If you cannot find the file for your language, please open an issue or post a comment here: TODO

Translations are stored in JSON files that contain entries like this:

```json
"tw.menuBar.code": {
    "defaultMessage": "Source Code",
    "description": "Text for source code link in the Help menu",
    "message": ""
},
```

`tw.menuBar.code` is the message ID. This is used internally. Do not change this.

`defaultMessage` is the English translation of the message. Do not change this.

`description` describes more about the message, where it's displayed, the context, etc. Do not change this.

`message` is the actual translated message. An empty string (`""`) means that this message has not been translated into this language. Translate the english message (defaultMessage) and write the translated message here.

Remember, this file is JSON. That means that strings to have "quotes around them" and that you may need to escape certain special characters (although you probably won't have to escape anything)

Commit your changes and submit a pull request to this repository.

### Special syntax

Sometimes messages can contain variables, for example:

```json
"tw.framerateIndicator": {
    "defaultMessage": "{framerate} FPS",
    "description": "Label indicating project framerate",
    "message": ""
},
```

`{framerate}` is a variable that will be replaced with something else. In this, `{framerate}` will become a number like `60`. Make sure your translated message contains the same variable. Do not translate the name of the variable.

It's also possible that the variable is replaced with another translation, for example:

```json
"tw.footer.host": {
    "defaultMessage": "Hosting for TurboWarp is provided by {fosshost}.",
    "description": "Host credit",
    "message": ""
},
"tw.footer.host.fosshost": {
    "defaultMessage": "fosshost.org",
    "description": "Link to fosshost.org",
    "message": ""
},
```

Here, `{fosshost}` will be replaced with the translation of `tw.footer.host.fosshost`.
