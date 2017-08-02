module.exports = class T {
  constructor (data, { defaultLocale } = {}) {
    this._defaultLocale = defaultLocale || '_'
    this._data = {}
    this._parse(data)
  }

  _parse (data, locale, prefix) {
    for (let k in data) {
      let val = data[k]
      let key = prefix ? `${prefix}.${k}` : k

      if (typeof val === 'object') {
        this._parse(val, locale, key)
      } else {
        if (locale) {
          key = `${key}.${locale}`
        }

        this._data[key] = val
      }
    }
  }

  loadLocale (locale, data) {
    if (!locale) {
      throw new Error('Locale needed')
    }

    this._parse(data, locale)
  }

  t (id, vars = {}, { locale } = {}) {
    const keys = [
      `${id}.${this._defaultLocale}`,
      id
    ]

    if (locale) {
      keys.unshift(`${id}.${locale}`)
    }

    for (let i in keys) {
      const key = keys[i]

      if (this._data[key]) {
        let ret = this._data[key]

        for (let k in vars) {
          ret = ret.replace(new RegExp(`{${k}}`, 'gm'), vars[k])
        }

        return ret
      }
    }
  }
}
