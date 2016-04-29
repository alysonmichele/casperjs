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

	casper.test.begin('Number rotation suite', (labels.length*14), function suite(test){
		var urls;
		var format=[];
		var x;
		var changed_format=[];
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
					format=this.evaluate(id.getFormattedElements);
					//this.echo(format);


					//wait for ST to execute
					casper.waitForSelectorTextChange('div.formatted', function(){
						this.echo('format has changed');
						this.echo(this.getHTML('div.formatted'));
					});

				});

				this.then(function(){
					changed_format=this.evaluate(id.getFormattedElements);
					//this.echo(changed_format);
					if (format[0] != changed_format[0]){
						for (var z = 0; z <changed_format.length; z++){
							id.checkFormat(test, changed_format[z], format[z]);
						}
					}
			});
				phantom.clearCookies();
		});
});

		casper.run(function(){
			test.done();
		});
	});
