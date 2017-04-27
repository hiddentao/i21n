module.exports = class T {
  constructor (data, { defaultLocale } = {}) {
    this._defaultLocale = defaultLocale
    this._data = {}
    this._parse(data)
  }

  _parse (data, prefix) {
    for (let k in data) {
      const val = data[k]
      const key = prefix ? `${prefix}.${k}` : k

      if (typeof val === 'object') {
        this._parse(val, key)
      } else {
        this._data[key] = val
      }
    }
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
