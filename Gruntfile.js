/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        expr: true,
        trailing: true,
      },
      gruntfile: {
        src: 'Gruntfile.js',
        options: {
          globals: {
            require: false,
          },
        },
      },
      lib: {
        src: ['lib/**/*.js'],
        options: {
          globals: {
            requirejs: false,
            define: false,
            window: false,
          },
        },
      },
      spec: {
        src: ['spec/**/*.js'],
        options: {
          globals: {
            requirejs: false,
            describe: false,
            it: false,
            xit: false,
            context: false,
            before: false,
            beforeEach: false,
            after: false,
            afterEach: false,
            define: false,
            expect: false,
          },
        },
      },
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        coverageReporter: {
          type: 'text-summary'
        }
      },
      coverage: {
        coverageReporter: {
          type: 'html'
        }
      },
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      dev: {
        files: ['lib/**/*.js', 'spec/**/*.js', 'lib/**/*.html'],
        tasks: ['build', 'karma:unit', 'jshint']
      },
      copy: {
        files: [
          'app/lib',
        ],
        tasks: ['copy:dev'],
      },
      bower: {
        files: ['bower.json'],
        tasks: ['build:full', 'karma:unit', 'jshint'],
      },
    },

    copy: {
      dev: {
        files: [
          {expand: true, cwd: 'lib', src: ['**/*.js'], dest: 'build'},
          {expand: true, cwd: 'lib', src: ['**/*.json'], dest: 'build'},
        ],
      },
      dist: {
        files: [
        ],
      },
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'build',
          name: 'json-gcs',
          mainConfigFile: 'build/json-gcs.js',
          out: 'dist/json-gcs.js',
          optimize: 'uglify2',
        },
      },
    },

    bower: {
      install: {
      }
    },

    clean: ['.tmp', 'build', 'coverage'],
  });

  // These plugins provide necessary tasks.
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Build tasks.
  grunt.registerTask('build', ['copy:dev']);
  grunt.registerTask('build:full', ['clean', 'build', 'bower:install']);
  grunt.registerTask('build:dist', ['clean', 'copy:dev', 'bower:install', 'requirejs']);

  // Default task.
  grunt.registerTask('default', ['build:full', 'karma:unit', 'jshint', 'build:dist']);
  grunt.registerTask('coverage', 'Detailed test coverage information', ['build:full', 'karma:coverage']);

};
