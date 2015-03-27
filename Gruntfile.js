module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
            style: 'expanded'
        },
        files: {
            'public/css/style.css': 'public/css/sass/style.scss'
        },
      },
    },
    watch: {
      css: {
        files: 'public/css/sass/*.scss',
        tasks: ['sass']
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
}