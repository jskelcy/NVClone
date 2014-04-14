module.exports = function(grunt) {
	// Config
	grunt.initConfig({
		express: {
			dev: {
				options: {
					script: './server.js'
				}
			}
		},
		jshint: {
   			all: ['Gruntfile.js', 'app/js/*.js']
  		},
		watch: {
 			express: {
				files:  ['./server.js'],
				tasks:  ['express:dev'],
				options: { spawn: false, livereload: false }

    		},
    		templates: {
    			files: ['**/*.html']
    		},
    		css: {
    			files: ['**/*.css']
    		},
    		options: {
    			livereload: true
    		}
  		} 
  	});

	// Load tasks
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	// Register tasks
	grunt.registerTask('server', ['express:dev', 'watch']);
};
