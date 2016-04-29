var id = require('../test');

var cssTags = ["div.class_number", "div#id_number"];

var labels = [
	{
		URL: 'http://asimkins.com',
		Type: "Direct Visit"
	}, 
	{
		URL: 'http://asimkins.com?st-t=test',
		Type: "URL Tag"
	},
	{
		URL: 'http://asimkins.com?custom=test',
		Type: "Custom URL Tag"
	},
	{
		URL: 'http://asimkins.com/page_two.html',
		Type: "Path"
	},
	{
		URL: 'https://t.co/1N9iNCrATT',
		Type: "Referrer Domain"
	}
	]

// Number replacement works for all activities

	casper.test.begin('Number rotation suite', (labels.length*2), function suite(test){
		var urls;
		var original_id, original_class, original_NTR;
		var arrayLength;
		var originals;
		var i = -1;

		casper.start(labels[0]["URL"], function(){
			urls=labels;
		});

		casper.then(function(){
			this.eachThen(urls, function(){
				
				var j=++i;
				this.echo("Activity: " + urls[j].Type);
				this.thenOpen(urls[j].URL, function(){
					this.echo("URL: " + urls[j].URL);
					original_id=this.getHTML('div#id_number');
					original_class=this.getHTML('div.class_number');

					originals = [original_class, original_id];
					arrayLength = originals.length;

					//wait for ST to execute
					casper.waitForSelectorTextChange('div#id_number', function(){
						this.echo('ID has changed');
					});

				});

				this.then(function(){
					newb=this.getHTML('div#id_number');
					this.echo(newb);
					for (var i = 0; i < arrayLength; i++){
						test.assertSelectorDoesntHaveText(cssTags[i], originals[i]);
					}
			});
				phantom.clearCookies();
		});
});

		casper.run(function(){
			test.done();
		});
	});
