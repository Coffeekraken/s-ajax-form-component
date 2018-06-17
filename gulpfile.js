var gulp = require('gulp'),
    connect = require('gulp-connect-php7');

gulp.task('demo:server', function() {
    connect.server({
		base: 'demo',
		port: 8080
	});
});

gulp.task('default', ['demo:server']);
