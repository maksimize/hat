var colors = require('colors');
var logSeparator = '----------------------------------------------------'.cyan;
var logSuffix = '--'.cyan;

console.log(logSeparator);
console.log( '       ' + logSuffix + logSuffix + logSuffix + ' Hat (web makers tool) '.green + logSuffix + logSuffix + logSuffix );
console.log(logSeparator);
console.log(logSuffix);


exec = require('child_process').exec;
var arguments = process.argv.splice(2);

switch (arguments[0]){
	case 'jquery':
	jquery(arguments[1]);
    break;


	case 'bootstrap':
	bootstrap(arguments[1]);
    break;

	case 'laravel':
	laravel(arguments[1]);
    break;
	
	case 'cake':
	cake(arguments[1]);
    break;

    default:
    console.log(logSuffix + ' ' + arguments[0] + ' Not found');
    console.log(logSuffix);
    console.log(logSeparator);
}


/*
 * Entiteis functions	
 */
function jquery(output){
   if(typeof(output)==='undefined') output = 'jquery.min.js';
	var url = 'http://code.jquery.com/jquery.min.js';
	file(output, url);
}


function bootstrap(output){
	if(typeof(output)==='undefined') output = 'bootstrap';
	var url = 'http://twitter.github.com/bootstrap/assets/bootstrap.zip';
	zip('bootstrap', output, url);
}

function laravel(output){
   if(typeof(output)==='undefined') output = 'laravel';
	var url = 'https://github.com/laravel/laravel/archive/master.zip';
	zip('laravel-master', output, url);
}

function cake(output){
   	if(typeof(output)==='undefined') output = 'cake';
	var url = 'https://github.com/cakephp/cakephp/archive/master.zip';
	zip('cakephp-master', output, url);
}



/*
 * Helper functions
 */

function zip(extractedFolderName, output, url){
	var tmpName = randomName();
	var tmpNameFolder = '@'+tmpName
	console.log (logSuffix+ 'Downloading '+ url);
	exec('wget -O ' + tmpName + ' ' + url , function(){
		console.log (logSuffix+ 'Unziping');
		exec('unzip '+ tmpName + ' -d '+ tmpNameFolder, function(){
			console.log (logSuffix+ 'Extracting');
			exec('mv '+ tmpNameFolder + '/' + extractedFolderName + ' ' + output, function(){
				exec('rm -rf ' + tmpNameFolder + ' ' + tmpName, function(){
					console.log(logSuffix + 'Done');
					console.log(logSuffix);
					console.log(logSeparator);
				});
			});
		});
	});
}

function file(output, url){
	var tmpName = randomName();
	var tmpNameFolder = '@'+tmpName
	console.log (logSuffix+ 'Downloading '+ url);
	exec('wget -O ' + tmpName + ' ' + url , function(){
		console.log (logSuffix+ 'Renaming');
		exec('mv '+ tmpName + ' ' + output, function(){
			console.log(logSuffix + 'Done');
			console.log(logSuffix);
			console.log(logSeparator);
		});
	});
}

function randomName(callback){
	var date = new Date();
	return date.toISOString();	
}