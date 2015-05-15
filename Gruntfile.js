module.exports = function(grunt){

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'js/*.js', 'spec/*Spec.js']
    },

    watch: {
      jshint: {
        files: 'js/*.js',
        tasks: 'jshint'
      },
      karma: {
          files: ['js/app.js', 'spec/*Spec.js'],
          tasks: ['karma:unit:run']
            }
    },

    jasmine: {
      files: 'spec/*Spec.js'
    },

    karma: {
      unit: {
        options: {
          files: { src: ['spec/*Spec.js'] },
        },
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'jasmine']);

};