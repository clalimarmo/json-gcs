define(function() {
  //constructor dependency injection helper
  var ensure = function(dependencyNames, dependencies) {
    var onlyDependencies = {};
    for (var i = 0; i < dependencyNames.length; i++) {
      var expectedDependency = dependencyNames[i];
      var injectedDependency = dependencies[expectedDependency];
      if (injectedDependency === undefined || injectedDependency === null) {
        throw new Error('missing dependency:' + expectedDependency);
      } else {
        onlyDependencies[expectedDependency] = injectedDependency;
      }
    }
    return onlyDependencies;
  };

  var JsonGCS = function(deps) {
    ensure(['authenticator', 'http', 'bucketName'], deps);
    ensure(['token'], deps.authenticator);

    //helpers
    var authHeader = function() {
      return 'Bearer ' + deps.authenticator.token();
    };

    var objectCreateURL = function(name) {
      return 'https://www.googleapis.com/upload/storage/v1/b/' +
        deps.bucketName + '/o?uploadType=media&name=' + name;
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
              items.push(json.items[i].name);
            }
            handlers.success(items);
          },
        }
      );
    };

    instance.put = function(name, doc) {
      deps.http.ajax(
        objectCreateURL(name),
        {
          method: 'POST',
          headers: { 'Authorization': authHeader() },
          data: JSON.stringify(doc)
        }
      );
    };

    instance.get = function(name, handlers) {
      deps.http.ajax(
        objectGetURL(name),
        {
          headers: { 'Authorization': authHeader() },
          success: function(doc) {
            var json = JSON.parse(doc);
            handlers.success(json);
          },
          error: handlers.error
        }
      );
    };

    return instance;
  };

  return JsonGCS;
});
