'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var RESOURCEPATH = '/documents';

var Documents = /*#__PURE__*/function () {
  function Documents(collectionName, apiCall) {
    (0, _classCallCheck2.default)(this, Documents);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Documents, [{
    key: "create",
    value: function create(document) {
      return this._apiCall.post(this._endpointPath(), document);
    }
  }, {
    key: "upsert",
    value: function upsert(document) {
      return this._apiCall.post(this._endpointPath(), document, {
        action: 'upsert'
      });
    }
  }, {
    key: "update",
    value: function update(document) {
      return this._apiCall.post(this._endpointPath(), document, {
        action: 'update'
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      var queryParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._apiCall.delete(this._endpointPath(), queryParameters);
    }
  }, {
    key: "createMany",
    value: function () {
      var _createMany = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(documents) {
        var options,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

                this._apiCall.logger.warn('createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents');

                return _context.abrupt("return", this.import(documents, options));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMany(_x) {
        return _createMany.apply(this, arguments);
      }

      return createMany;
    }()
    /**
     * Import a set of documents in a batch.
     * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
     * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
     */

  }, {
    key: "import",
    value: function () {
      var _import2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(documents) {
        var options,
            documentsInJSONLFormat,
            resultsInJSONLFormat,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

                if (Array.isArray(documents)) {
                  documentsInJSONLFormat = documents.map(function (document) {
                    return JSON.stringify(document);
                  }).join('\n');
                } else {
                  documentsInJSONLFormat = documents;
                }

                _context2.next = 4;
                return this._apiCall.performRequest('post', this._endpointPath('import'), {
                  queryParameters: options,
                  bodyParameters: documentsInJSONLFormat,
                  additionalHeaders: {
                    'Content-Type': 'text/plain'
                  }
                });

              case 4:
                resultsInJSONLFormat = _context2.sent;

                if (!Array.isArray(documents)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", resultsInJSONLFormat.split('\n').map(function (r) {
                  return JSON.parse(r);
                }));

              case 9:
                return _context2.abrupt("return", resultsInJSONLFormat);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _import(_x2) {
        return _import2.apply(this, arguments);
      }

      return _import;
    }()
  }, {
    key: "export",
    value: function _export() {
      return this._apiCall.get(this._endpointPath('export'));
    }
  }, {
    key: "search",
    value: function search(searchParameters) {
      return this._apiCall.get(this._endpointPath('search'), searchParameters);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(Documents.RESOURCEPATH).concat(operation === undefined ? '' : '/' + operation);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Documents;
}();

exports.default = Documents;
//# sourceMappingURL=Documents.js.map
