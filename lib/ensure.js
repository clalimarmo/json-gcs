define(function() {
  return function(dependencyNames, dependencies) {
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
});
