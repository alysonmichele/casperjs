var id = require('test');

var cssTags = ["div#NTR_number", "div.class_number", "div#id_number"];

var url='http://asimkins.com?custom=test';



// Number replacement works for URL tag activity

	casper.test.begin('Check Custom Tagged URL number replacement', 3, function(test){
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


casper.test.begin('Check Custom Tagged URL number replacement Formats', 14, function(test){
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


casper.test.begin('Check Custom Tagged number replacement formats across pages', 15, function(test){
 	var format=[];
 	var x;
 	var changed_format=[];
	var arrayLength;

	casper.start(url, function() {
		

		format=this.evaluate(id.getFormattedElements);
		this.echo(format);

		//wait for JS to render
		

	});
		casper.wait(2000);
		casper.then(function(){

		//click link to second page
		
		this.click('#second_page');


	});
		casper.wait(2000);
		casper.then(function(){

		//TEST ONE: assert that we are on the second page

		 test.assertUrlMatch('http://asimkins.com/page_two.html');
		 this.echo(this.getCurrentUrl());

	});

		casper.wait(4000);
		casper.then(function(){

		changed_format=this.evaluate(id.getFormattedElements);
		this.echo(changed_format);

		//first check to make sure that something actually changed

		if (format[0] != changed_format[0]){

		//TESTS TWO - FIFTEEN: check format is the same across pages

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
