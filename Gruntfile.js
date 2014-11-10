module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: "expanded"
				},
				files: {
					'public/styles.css': 'public/styles.scss'
				}
			}
		},

		watch: {
		  css: {
		    files: 'public/*.scss',
		    tasks: ['sass'],
		    options: {
		      livereload: true,
		    }
		  }
		}
	});

	// Plugins.
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'watch']);

};

