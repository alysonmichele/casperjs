var id = require('../test');

var cssTags = ["div#NTR_number", "div.class_number", "div#id_number"];
var url= ['http://asimkins.com/locations/location_page.html'];


casper.test.begin('Check Direct Visit number replacement Formats', 14, function(test){
	var format=[];
	var x;
	var changed_format=[];

	casper.start(url, function() {

		format=this.evaluate(id.getFormattedLocations);
		this.echo(format);

	});
	
	casper.wait(2000);
	casper.then(function(){

		changed_format=this.evaluate(id.getFormattedLocations);
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


casper.test.begin('Check Direct Visit number replacement formats across pages', 15, function(test){
 	var format=[];
 	var x;
 	var changed_format=[];
	var arrayLength;

	casper.start(url, function() {
		

		format=this.evaluate(id.getFormattedLocations);
		this.echo(format);

		//wait for JS to render
		

	});
		casper.wait(2000);
		casper.then(function(){

		//click link to second page
		
		this.click('#second_location_page');


	});
		casper.wait(2000);
		casper.then(function(){

		//TEST ONE: assert that we are on the second page

		 test.assertUrlMatch('http://asimkins.com/locations/second_location_page.html');
		 this.echo(this.getCurrentUrl());

	});

		casper.wait(4000);
		casper.then(function(){


		changed_format=this.evaluate(id.getFormattedLocations);
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
