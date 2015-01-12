define(function() {
  var DatastoreFile = function(deps) {
    var datastore = deps.datastore;

    var onLoadedCallbacks = [];

    var filename = null;
    var data = null;

    var instance = {};

    var runOnloadedCallbacks = function() {
      for (var i in onLoadedCallbacks) {
        onLoadedCallbacks[i](data);
      }
    };

    var save = function(handlers) {
      datastore.put(filename, data, handlers);
    };

    instance.onLoaded = function(callback) {
      if (typeof callback === 'function') {
        onLoadedCallbacks.push(callback);
      }
    };

    instance.dir = function(handleResponse) {
      datastore.index({success: handleResponse});
    };

    instance.save = function(_data, handlers) {
      data = _data;
      save(handlers);
    };

    instance.open = function(_filename, _handlers) {
      var handlers = {};
      _handlers = _handlers || {};
      handlers.error = _handlers.error;
      handlers.success = function(_data) {
        filename = _filename;
        data = _data;
        runOnloadedCallbacks();
        if (typeof _handlers.success === 'function') {
          _handlers.success();
        }
      };
      datastore.get(_filename, handlers);
    };

    instance.data = function() {
      return data;
    };

    instance.filename = function() {
      return filename;
    };

    instance.init = function(_filename, _data, handlers) {
      filename = _filename;
      data = _data;
      save(handlers);
    };

    return instance;
  };
  return DatastoreFile;
});
