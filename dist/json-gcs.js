define(function(require) {
  var $ = require('jquery');

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
    deps = ensure(['authenticator', 'bucketName'], deps);
    deps.authenticator = ensure(['token'], deps.authenticator);

    //helpers
    var authHeader = function() {
      return 'Bearer ' + deps.authenticator.token();
    };

    var objectCreateURL = function(name) {
      return 'https://www.googleapis.com/upload/storage/v1/b/' +
        deps.bucketName + '/o?uploadType=media&name=' + name;
    };

    var objectGetURL = function(name) {
      return 'https://storage.googleapis.com/' + deps.bucketName + '/' + name;
    };

    //instance methods
    var instance = {};

    instance.put = function(name, doc) {
      $.ajax(
        objectCreateURL(name),
        {
          method: 'POST',
          headers: { 'Authorization': authHeader() },
          data: JSON.stringify(doc)
        }
      );
    };

    instance.get = function(name, handleJson) {
      $.ajax(
        objectGetURL(name),
        {
          headers: { 'Authorization': authHeader() },
          success: function(doc) {
            var json = JSON.parse(doc);
            handleJson(json);
          }
        }
      );
    };

    return instance;
  };

  return JsonGCS;
});
