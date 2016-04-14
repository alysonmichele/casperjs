
function getLocationOne(){
	var location_one= document.getElementById("location_num_one");
    return location_one.innerHTML;
}


function getLocationOneWOne(){
	var location_one_plus_one= document.getElementById("location_num_one_w_one");
    return location_one_plus_one.innerHTML;
}

// Number replacement works for URL tag activity

casper.test.begin('Check Location number replacement', 2, function(test){
	var url= 'http://portal.ifbyphone.local/aly/location_page.html?st-t=test'
	var original_location;
	var original_location_plus_one;

	casper.start(url, function() {

		original_location=this.evaluate(getLocationOne);
		this.echo(original_location);
		original_location_plus_one=this.evaluate(getLocationOneWOne);
		this.echo(original_location_plus_one);


	});
		casper.wait(2000, function(){
				test.assertSelectorDoesntHaveText('div#location_num_one', original_location);

				test.assertSelectorDoesntHaveText('div#location_num_one_w_one', original_location_plus_one);

		}).
		run(function(){
		test.done();
});

});

casper.test.begin('Check Location number replacement across pages', 3, function(test){
	var url= 'http://portal.ifbyphone.local/aly/location_page.html?st-t=test'
	var replaced_location;
	var replaced_location_plus_one;

	casper.start(url, function() {

		casper.wait(2000, function(){

		replaced_location=this.evaluate(getLocationOne);
		replaced_location_plus_one=this.evaluate(getLocationOneWOne);

		this.echo(replaced_location)
		this.echo(replaced_location_plus_one)
		this.click('#second_location_page')

		});

	});
		casper.wait(2000, function(){

			test.assertUrlMatch('http://portal.ifbyphone.local/aly/second_location_page.html');
			this.echo(this.getCurrentUrl());
			test.assertSelectorHasText('div#location_num_one', replaced_location);

			test.assertSelectorHasText('div#location_num_one_w_one', replaced_location_plus_one);

		}).
		run(function(){
		test.done();
		phantom.clearCookies();

});

});








