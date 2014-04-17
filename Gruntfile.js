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
        sass:{
            all: {
                src: ['app/css/*.scss'],
                dest: 'app/css/style.css',
                options:{
                    outputStyle : 'nested'
                }
            }
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
    		sass: {
    			files: '<%= sass.all.src %>',
                tasks: 'sass'
    		},
    		options: {
    			livereload: true
    		}
  		} 
  	});

	// Load tasks
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	// Register tasks
	grunt.registerTask('server', ['express:dev', 'watch']);
};
