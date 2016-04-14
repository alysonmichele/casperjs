var id = require('test');

var cssTags = ["div#NTR_number", "div.class_number", "div#id_number"];

// Number replacement works for Referer Domain activity

casper.test.begin('Check Referer Domain number replacement', 4, function(test){
	var url= 'http://portal.ifbyphone.local/aly/referal_page.html'
	var original_id, original_class, original_NTR;
	var originals;
	var arrayLength;

	casper.start(url, function() {

		this.click('#main_page')
		casper.wait(20, function(){
		test.assertUrlMatch('http://portal.ifbyphone.local/aly/index.html');

		original_id=this.evaluate(id.getId);
		original_class=this.evaluate(id.getClass);
		original_NTR=this.evaluate(id.getNTR);

		originals = [original_NTR, original_class, original_id];
		arrayLength = originals.length;
});
	});
		casper.wait(2000, function(){

			for (var i = 0; i < arrayLength; i++){
				id.checkForChange(test, cssTags[i], originals[i]);
			}

			for (var x = 0; x < arrayLength; x++){
				this.echo(originals[x]);
			}
		}).
		run(function(){
		test.done();
});

});

casper.test.begin('Check Referer Domain number replacement across pages', 5, function(test){
	var url= 'http://portal.ifbyphone.local/aly/referal_page.html'
	var replaced_id, replaced_class, replaced_NTR;
	var replaced;
	var arrayLength;

	casper.start(url, function() {

		this.click('#main_page')
		casper.wait(20, function(){
		
			test.assertUrlMatch('http://portal.ifbyphone.local/aly/index.html');

			replaced_id=this.evaluate(id.getId);
			replaced_class=this.evaluate(id.getClass);
			replaced_NTR=this.evaluate(id.getNTR);

			this.click('#second_page')

			replaced = [replaced_NTR, replaced_class, replaced_id];
			arrayLength = replaced.length;

			for (var x = 0; x < arrayLength; x++){
				this.echo(replaced[x]);
			}

});
	});
		casper.wait(2000, function(){

			test.assertUrlMatch('http://portal.ifbyphone.local/aly/page_two.html');
			this.echo(this.getCurrentUrl());

			for (var i = 0; i < arrayLength; i++){
				id.checkForChangePageTwo(test, cssTags[i], replaced[i]);
			}
		
		}).
		run(function(){
		test.done();
		phantom.clearCookies();

});

});





