// Karma configuration
// Generated on Thu Feb 06 2014 09:46:59 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      // NB: requirejs should come before chai in the list below, to avoid a
      // known issue: https://github.com/xdissent/karma-chai/issues/5
      'requirejs',
      'mocha',
      'chai',
    ],


    // list of files / patterns to load in the browser
    files: [
      //our code
      {pattern: 'build/**/*.js', included: false},
      {pattern: 'spec/**/*_spec.js', included: false},
      {pattern: 'spec/**/*_spec.coffee', included: false},

      'spec/main.js',
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp',
      'build/bower_components/**/test/**/*js', //DO NOT run tests for third party libraries
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.coffee': ['coffee'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],

    coverageReporter: {
      reporters:[
        {type: 'html', dir:'coverage/'},
        {type: 'text-summary'},
      ],
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
