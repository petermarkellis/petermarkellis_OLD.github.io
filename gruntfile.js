


module.exports = function(grunt) {
  "use strict";
  // Load all NPM grunt tasks
  //require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    

    // The clean task ensures the entire XXX folder is removed
    clean:  {
      development: ["_site", "javascript", "css"],
      tempfolders: ["javascript", "css"]
    },


    compass: {
      dist: {
        options: {
          sassDir: '_assets/sass',
          cssDir: 'css',
          outputStyle: 'compressed'
        }
      }
    },


    //Validate our javascript files
    jshint: {
     files: ['gruntfile.js', '_assets/js/*.js', '_assets/js/modules/*.js'],
     options: {
         globals: {
              jQuery: true,
              console: true,
              module: true
         }
     }
    },


    concat: {
        options: {
            separator: '\r\n'
        },
        dist: {
            src: ['_assets/js/modules/*.js'],
            dest: '_assets/js/app.js'
        }
    },


    uglify: {
      options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
        dist: {
             files: {
                  '_assets/js/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    watch: {
        files: ['<%= jshint.files %>', '_assets/sass/*.scss'],
        tasks: ['concat', 'uglify', 'jshint', 'compass']
    },

    /*shell: {
          build: {
              command: 'jekyll build'
          },
          serve: {
              command: 'jekyll serve'
          }
      },
      watch: {
          files: [
              '_includes/*.html',
              '_layouts/*.html',
              '_posts/*.markdown',
              '_config.yml',
              'index.html'
          ],
          tasks: ['shell:build', 'shell:serve'],
          options: {
              interrupt: true,
              atBegin: true
          }
      }*/
      exec: {
        
        build: {
          cmd: 'jekyll build'
        },
        server: {
          cmd: 'jekyll serve --watch'
        }
      },


      mkdir: {
        js: {
          options: {
            mode: 777,
            create: ['_site/js']
          },
        },
      },

      copy: {
        jsfiles: {
            files: [
                {
                    src: ['_assets/js/all-posts.json'],
                    dest: 'javascript/all-posts.json'
                },
                {
                    expand: true,
                    flatten: true,
                    src: ['_assets/js/external-libs/*.js'],
                    dest: 'javascript/'
                },
                {
                    expand: true,
                    flatten: true,
                    src: ['_assets/js/*.min.js'],
                    dest: 'javascript/'
                }

            ]
        }
    },



  });


  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-mkdir');



  grunt.registerTask('cleanup',  ['clean:development']);

  grunt.registerTask('runtests', ['jshint']);
  
  grunt.registerTask('build',    ['cleanup', 'compass', 'concat', 'jshint', 'uglify','copy:jsfiles','exec:build', 'clean:tempfolders']);

  grunt.registerTask('serve',    ['exec:server']);





};