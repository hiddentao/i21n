const I21n = require('../')

const { expect } = require('code')

exports['basic'] = {
  beforeEach: function () {
    const trans = new I21n({
      'screen.test1': 'Oh yeah!',
      'screen.test2': 'Hello {name}, is your fullname {name} {surname}?',
      'screen': {
        'test3': 'Oh yeah 3'
      },
      'screen.test3': {
        'child': {
          'en-gb': 'Now {action}',
          'de': 'Jetzt {action}'
        },
        'child2': {
          'en-gb': 'Now2 {action}',
          'de': 'Jetzt {action}'
        }
      }
    }, {
      defaultLocale: 'en-gb'
    })

    this.t = trans.t.bind(trans)
    this.sub = trans.sub.bind(trans)
    this.loadLocale = trans.loadLocale.bind(trans)
  },

  'bad id': function () {
    expect(this.t('screen.invalid')).to.be.undefined()
  },

  'string id': function () {
    expect(this.t('screen.test1')).to.equal('Oh yeah!')
  },

  'arg replacement': function () {
    expect(this.t('screen.test2', {
      name: 'Ram',
      surname: 'Bo'
    })).to.equal('Hello Ram, is your fullname Ram Bo?')
  },

  'nested object -> string id': function () {
    expect(this.t('screen.test3')).to.equal('Oh yeah 3')
  },

  'default locale': function () {
    expect(this.t('screen.test3.child', {
      action: 'go'
    })).to.equal('Now go')
  },

  'override locale': function () {
    expect(this.t('screen.test3.child', {
      action: 'go'
    }, {
      locale: 'de'
    })).to.equal('Jetzt go')
  },

  'fallback to default locale': function () {
    expect(this.t('screen.test3.child2', {
      action: 'go'
    }, {
      locale: 'fr'
    })).to.equal('Now2 go')
  },

  'load additional locale data': function () {
    this.loadLocale('fr', {
      'screen.test1': 'Oh way!',
      'screen.test3': {
        'child': 'yar',
        'child2': {
          'ok': 'Now3'
        }
      }
    })

    expect(this.t('screen.test3.child', {
      action: 'what'
    }, {
      locale: 'en-gb'
    })).to.equal('Now what')

    expect(this.t('screen.test3.child', {}, {
      locale: 'fr'
    })).to.equal('yar')

    expect(this.t('screen.test3.child2.ok', {}, {
      locale: 'fr'
    })).to.equal('Now3')
  },

  'variable substitution helper': {
    'using all variables': function () {
      expect(this.sub('what is {my} {name}', {
        my: 'his',
        name: 'age'
      })).to.equal('what is his age')
    },
    'using only some variables': function () {
      expect(this.sub('what is {my} {name}', {
        my: 'his'
      })).to.equal('what is his {name}')
    }
  }
}
