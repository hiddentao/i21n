'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var T = function () {
  function T(data) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        defaultLocale = _ref.defaultLocale;

    _classCallCheck(this, T);

    this._data = data;
    this.defaultLocale = defaultLocale;

    this._parse(this._data);
  }

  _createClass(T, [{
    key: '_parse',
    value: function _parse(data, prefix) {
      for (var k in data) {
        var val = data[k];
        var key = prefix ? prefix + '.' + k : k;

        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
          this._parse(val, key);
        } else {
          this._data[key] = val;
        }
      }
    }
  }, {
    key: 't',
    value: function t(id) {
      var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          locale = _ref2.locale;

      var keys = [id + '.' + this._defaultLocale, id];

      if (locale) {
        keys.unshift(id + '.' + locale);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (this._data[key]) {
            var ret = this._data[key];

            for (var k in vars) {
              ret = ret.replace(new RegExp('{' + k + '}', 'gm'), vars[k]);
            }

            return ret;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return T;
}();

exports.default = T;