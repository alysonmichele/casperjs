var id = require('test');

var cssTags = ["div#NTR_number", "div.class_number", "div#id_number"];


// Number replacement works for URL tag activity

casper.test.begin('Check URL tag number replacement', 3, function(test){
	var url= 'http://portal.ifbyphone.local/aly/index.html?st-t=test'
	var original_id;
	var original_class;
	var original_NTR;

	casper.start(url, function() {

		original_id=this.evaluate(getID);
		this.echo(original_id);
		original_class=this.evaluate(getClass);
		this.echo(original_class);
		original_NTR=this.evaluate(getNTR);
		this.echo(original_NTR);

	});
		casper.wait(2000, function(){

				test.assertSelectorDoesntHaveText('div#NTR_number', original_NTR);

				test.assertSelectorDoesntHaveText('div.class_number', original_class);

				test.assertSelectorDoesntHaveText('div#id_number', original_id);

		}).
		run(function(){
		test.done();
});

});

casper.test.begin('Check URL tag number replacement across pages', 4, function(test){
	var url= 'http://portal.ifbyphone.local/aly/index.html?st-t=test'
	var replaced_id;
	var replaced_class;
	var replaced_NTR;

	casper.start(url, function() {

		casper.wait(2000, function(){

		replaced_id=this.evaluate(getID);
		replaced_class=this.evaluate(getClass);
		replaced_NTR=this.evaluate(getNTR);

		this.echo(replaced_NTR)
		this.echo(replaced_id)
		this.echo(replaced_class)
		this.click('#second_page')

		});

	});
		casper.wait(2000, function(){

			test.assertUrlMatch('http://portal.ifbyphone.local/aly/page_two.html');
			this.echo(this.getCurrentUrl());
			test.assertSelectorHasText('div#NTR_number', replaced_NTR);

			test.assertSelectorHasText('div.class_number', replaced_class);

			test.assertSelectorHasText('div#id_number', replaced_id);

		}).
		run(function(){
		test.done();
		phantom.clearCookies();

});

});





