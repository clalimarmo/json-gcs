define(function(require) {
  var ensure = require('ensure');

  var boundary = '32478901278hidoggy409';
  var multipartDelimiter = '\r\n--' + boundary + '\r\n';
  var multipartCloseDelimiter = '\r\n--' + boundary + '--';

  var Storage = function(deps) {
    ensure(['authenticator', 'http', 'bucketName'], deps);
    ensure(['token'], deps.authenticator);

    //helpers
    var authHeader = function() {
      return 'Bearer ' + deps.authenticator.token();
    };

    var objectCreateURL = function() {
      return 'https://www.googleapis.com/upload/storage/v1/b/' +
        deps.bucketName + '/o?uploadType=multipart';
    };

    var objectIndexURL = function() {
      return 'https://www.googleapis.com/storage/v1/b/' + deps.bucketName + '/o';
    };

    var objectGetURL = function(name) {
      return 'https://storage.googleapis.com/' + deps.bucketName + '/' + name;
    };

    //instance methods
    var instance = {};

    instance.index = function(handlers) {
      deps.http.ajax(
        objectIndexURL(),
        {
          headers: { 'Authorization': authHeader() },
          success: function(json) {
            var items = [];
            for (var i in json.items) {
              items.push(json.items[i]);
            }
            handlers.success(items);
          },
        }
      );
    };

    instance.put = function(name, doc, opts) {
      opts = opts || {};
      var topLevelMetadata = {
        name: name,
        metadata: opts.metadata,
      };
      var requestBody = multipartDelimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(topLevelMetadata) +
        multipartDelimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(doc) +
        multipartCloseDelimiter;
      deps.http.ajax(
        objectCreateURL(),
        {
          method: 'POST',
          headers: {
            'Authorization': authHeader(),
            'Content-Type': 'multipart/related; boundary="' + boundary + '"',
          },
          data: requestBody,
          success: opts.success,
          error: opts.error,
          complete: opts.complete,
        }
      );
    };

    instance.get = function(name, handlers) {
      deps.http.ajax(
        objectGetURL(name),
        {
          headers: { 'Authorization': authHeader() },
          success: function(doc) {
            var json;
            if (typeof doc === 'object') {
              json = doc;
            }
            else {
              json = JSON.parse(doc);
            }
            handlers.success(json);
          },
          error: handlers.error,
          complete: handlers.complete,
        }
      );
    };

    return instance;
  };

  return Storage;
});
