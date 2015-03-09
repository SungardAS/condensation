var gutil = require('gulp-util');
var through = require('through2');
var Handlebars = require('handlebars');
var fs = require('fs');

module.exports = function (data, opts) {

	var options = opts || {};
	//Go through a partials object
	if(options.partials){
		for(var p in options.partials){
			Handlebars.registerPartial(p, options.partials[p]);
		}
	}
	//Go through a helpers object
	if(options.helpers){
		for(var h in options.helpers){
			Handlebars.registerHelper(h, options.helpers[h]);
		}
	}

	// Do not search for more than 10 nestings
	var maxDepth = 10;
	// Process only files with given extension names
	var allowedExtensions = ['hb', 'hbs', 'handlebars', 'html'];

	/**
	 * Searching partials recursively
	 * @method mocksearchDirForPartialsPartials
	 * @param  {string}     dir directory
	 * @param  {string}     registrationDir short directory for registering partial
	 */
	var searchDirForPartials = function(dir, registrationDir, depth) {
		if (depth > maxDepth) {
			return;
		}

		var filenames = fs.readdirSync(dir);

		filenames.forEach(function (filename) {
			var stats = fs.statSync(dir + '/' + filename);

			// If directory, go recursive
			if (stats && stats.isDirectory()) {
				searchDirForPartials(dir + '/' + filename, registrationDir + '/' + filename, depth + 1);
			} else {
				// register only files with hb, hbs or handlebars
				if (allowedExtensions.indexOf(filename.split('.').pop()) !== -1) {
					var name = filename.substr(0, filename.lastIndexOf('.'));

					var template = fs.readFileSync(dir + '/' + filename, 'utf8');
					Handlebars.registerPartial(registrationDir + '/' + name, template);
					// console.log('Registered:', registrationDir + '/' + name)
				}
			}
		});
	}


	// Go through a partials directory array
	if(options.batch){
		// Allow single string
		if(typeof options.batch === 'string') options.batch = [options.batch];

		options.batch.forEach(function (piece) {
			searchDirForPartials(piece, piece.split('/').pop(), 0)
		});
	}

	/**
	 * For handling unknown partials
	 * @method mockPartials
	 * @param  {string}     content Contents of handlebars file
	 */
	var mockPartials = function(content){
		var regex = /{{> (.*)}}/gim, match, partial;
		if(content.match(regex)){
			while((match = regex.exec(content)) !== null){
				partial = match[1];
				//Only register an empty partial if the partial has not already been registered
				if(!Handlebars.partials.hasOwnProperty(partial)){
					Handlebars.registerPartial(partial, '');
				}
			}
		}
	};


	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-compile-handlebars', 'Streaming not supported'));
			return cb();
		}

		try {
			var fileContents = file.contents.toString();
			if(options.ignorePartials){
				mockPartials(fileContents);
			}
			var template = Handlebars.compile(fileContents);
			file.contents = new Buffer(template(data));
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-compile-handlebars', err));
		}

		this.push(file);
		cb();
	});
};
