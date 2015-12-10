// gruntfile.js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Format for reading data from package json
    // <%= pkg.name %>

    // Configure your tasks
    browserSync: {
        bsFiles: {
            src : './_build/**/*'
        },
        options: {
            watchTask: true,
            server: {
                baseDir: "./_build/",
                port: '8080'
            }
        }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: './_src/css',
          src: ['*.scss'],
          dest: './_build/css',
          ext: '.css'
        }]
      }
    },

    uglify: {
      dev: {
        files: {
          './_build/js/fed.min.js': ['./_src/js/anne.js', './_src/js/*.js']
        }
      }
    },

    copy: {
      main: {
        expand: true,
        flatten: true,
        src: './_src/*.html',
        dest: './_build/',
      },
    },

    watch: {
      css: {
        files: ['./_src/css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
      scripts: {
        files: ['./_src/js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['./_src/*.html'],
        tasks: ['copy'],
        options: {
          spawn: false,
        },
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'uglify', 'copy', 'browserSync', 'watch']);

  // grunt.registerTask('default', ['Log some stuff'], function(){
  //   grunt.log.write('some stuff to say I did it...').ok();
  // });

};
