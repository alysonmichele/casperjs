require('utils');
var id = require('../test');	

var json = require('../config.json');


var css_class=json.css_class;
var css_id=json.css_id;
var cssTags = [css_class, css_id];
var labels= json["labels"];

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
					original_id=this.getHTML(css_id);
					original_class=this.getHTML(css_class);

					originals = [original_class, original_id];
					arrayLength = originals.length;

					this.echo(original_id);

					//wait for ST to execute
					casper.waitForSelectorTextChange(css_id, function(){
						this.echo('ID has changed');
					});

				});

				this.then(function(){
					newb=this.getHTML(css_id);
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
