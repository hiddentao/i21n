# i21n

[![Build Status](https://secure.travis-ci.org/hiddentao/i21n.svg?branch=master)](http://travis-ci.org/hiddentao/i21n)
[![NPM module](https://badge.fury.io/js/i21n.svg)](https://badge.fury.io/js/i21n)
[![Join the chat at https://discord.gg/PBAR2Bz](https://img.shields.io/badge/discord-join%20chat-738bd7.svg?style=flat-square)](https://discord.gg/PBAR2Bz)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/hiddentao)

Tiny string internationalization and interpolation library.

Features:
* Named-variable interpolation
* Flexible configuration format
* Set default and fallback locale
* Works in Node.js and browser
* Small, no external dependencies

## Install

```
npm install i21n
```

## Usage

```js
const i21n = require('i21n')

const i21n = new i21n({
  /* Basic */
  'hello.world': 'Hello world',
  /* With variables */
  'hello.fullname': 'Hello {name}, your full name is {name} {surname}',
  /* Nested */
  'hello.world.and': {
    'goodbye': {
      'name': 'Hello world, goodbye {name}'
    }
  }
})

// "Hello world"
i21n.t('hello.world')

// "Hello Ram, your full name is Ram Bo"
i21n.t('hello.fullname', {
  name: 'Ram',
  surname: 'Bo'
})

// "Hello world, goodbye Ram"
i21n.t('hello.world.and.goodbye.name', {
  name: 'Ram'
})
```

Different language translation versions (i.e. locales):

```js
const i21n = new i21n({
  'good': {
    'day': {
      'en-gb': 'Good day {name}',
      'de': 'Guten tag {name}'
    }
  },
  'my': {
    'name.is': {
      'en-gb': 'My name is {name}',
      'zh-TW': '我叫{name}'
    }
  }    
}, {
  /** Locale to use when not explicitly specified or when specified locale version not found */
  defaultLocale: 'en-gb'
})

// Default locale
// "Good day Ram"
i21n.t('good.day', {
  name: 'Ram'
})

// Override with a specific locale
// "Guten tag Ram"
i21n.t('good.day', {
  name: 'Ram'
}, {
  locale: 'de'
})

// Override with a specific locale for which there is no string - it uses the default locale instead!
// "My name is Ram"
i21n.t('my.name.is', {
  name: 'Ram',
  locale: 'de'
})
```

## License

MIT - see [LICENSE.md](LICENSE.md)
