# Translations

Translations for TurboWarp.org

## Scope

This repository is only for translating strings added by TurboWarp. Scratch translations are not maintained here.

## Submitting translations

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Internal scripts

### Importing translations

To import translations, go to a clone of scratch-gui and run:

```
npm run build
```

This will generate a folder called `translations`. Copy `translations/messages/src` to the `in` folder of this repository (you may have to create it). The structure of how you copy the files doesn't matter, the script will figure it out. Then run:

```
node scripts/load-from-scratch-gui.js
```

This will generate the files in the `languages` folder.

### Exporting translations

Run:

```
node scripts/build-for-scratch-gui.js
```

This will generate simplified translation files in `out`.

TODO everything beyond this point is not settled yet
