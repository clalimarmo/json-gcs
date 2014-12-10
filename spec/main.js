// based on https://github.com/kjbekkelund/karma-requirejs
var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/spec\.js$/.test(file)) {
      tests.push(file);
    }
    if (/spec\.coffee$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/build',
  paths: {},
  shim: {},
  deps: tests,

  // start test run, only after Require.js is done
  callback: window.__karma__.start,
});
