require('utils');
var id = require('../test');

var json = require('../config.json');


var css_class=json.css_class;
var css_id=json.css_id;
var cssTags = [css_class, css_id];
var labels= json["labels"];
var formatted=json.formatted;


// Number replacement works for all activities

	casper.test.begin('Number rotation for various formats suite', (labels.length*14), function suite(test){
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
					casper.waitForSelectorTextChange(formatted, function(){
						this.echo('format has changed');
						this.echo(this.getHTML(formatted));
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
