var id = require('test');

var cssTags = ["div#NTR_number", "div.class_number", "div#id_number"];


	casper.test.begin('Check Direct Visit number replacement', 3, function(test){
		var url= 'http://asimkins.com'
		var original_id, original_class, original_NTR;
		var arrayLength;
		var originals;

		casper.start(url, function() {

		//evaluates
		original_id=this.evaluate(id.getId);
		original_class=this.evaluate(id.getClass);
		original_NTR=this.evaluate(id.getNTR);

		originals = [original_NTR, original_class, original_id];

		arrayLength = originals.length;

		});
		
		casper.wait(2000);
		casper.then(function(){

			for (var i = 0; i < arrayLength; i++){
				id.checkForChange(test, cssTags[i], originals[i]);
			}

			for (var x = 0; x < arrayLength; x++){
				this.echo(originals[x]);
			}

			// var cookies=phantom.cookies;
			// console.log('cookies:');
			// for (var i in cookies){
			// 	console.log(cookies[i].name + '=' + cookies[i].value);
			// }


			}).
			run(function(){
			phantom.clearCookies();
			test.done();
	});

	});


casper.test.begin('Check Direct Visit number replacement Formats', 14, function(test){
	var url= 'http://asimkins.com'
	var format=[];
	var x;
	var changed_format=[];

	casper.start(url, function() {

		format=this.evaluate(id.getFormattedElements);
		this.echo(format);

	});
	
	casper.wait(2000);
	casper.then(function(){

		changed_format=this.evaluate(id.getFormattedElements);
		this.echo(changed_format);

		//first check to make sure that something actually changed

		if (format[0] != changed_format[0]){


			for (var z = 0; z <changed_format.length; z++){
				id.checkFormat(test, changed_format[z], format[z]);
			}
		}

		}).
		run(function(){
		test.done();
		phantom.clearCookies();

});

});


// casper.test.begin('Check Direct Visit number replacement across pages', 4, function(test){
// 	var url= 'http://portal.ifbyphone.local/aly/index.html'
// 	var replaced_id, replaced_class, replaced_NTR;
// 	var original_id, original_class, original_NTR;
// 	var originals;
// 	var replaced;
// 	var arrayLength;

// 	casper.start(url, function() {
		

// 		original_id=this.evaluate(id.getId);
// 		original_class=this.evaluate(id.getClass);
// 		original_NTR=this.evaluate(id.getNTR);

// 		originals = [original_NTR, original_class, original_id];
// 		arrayLength = originals.length;

// 		this.echo(originals);

// 		this.click('#second_page')

// 	});
// 		casper.wait(2000, function(){

// 			test.assertUrlMatch('http://portal.ifbyphone.local/aly/page_two.html');
// 			this.echo(this.getCurrentUrl());

// 			replaced_id=this.evaluate(id.getId);
// 			replaced_class=this.evaluate(id.getClass);
// 			replaced_NTR=this.evaluate(id.getNTR);

// 			replaced = [replaced_NTR, replaced_class, replaced_id];
// 			arrayLength = replaced.length;

// 		for (var x = 0; x < arrayLength; x++){
// 			this.echo(replaced[x]);
// 		}
			
// 			for (var i = 0; i < arrayLength; i++){
// 				id.checkForChangePageTwo(test, cssTags[i], replaced[i]);
// 			}

// 		}).
// 		run(function(){
// 		test.done();
// 		phantom.clearCookies();

// });

// });





