require('utils');
var id = require('../test');

var json = require('../config.json');


var css_class=json.css_class;
var css_id=json.css_id;
var cssTags = [css_class, css_id];
var labels= json["labels"];
var main_page = json.main_page;
var second_page = json.second_page;
var formatted=json.formatted;

// Number replacement works for all activities

	casper.test.begin('Number rotation across pages suite', (labels.length*15), function suite(test){
		var urls;
		var format=[];
		var x;
		var changed_format=[];
		var i = -1;
		var page;
		var check;

		casper.start(labels[0]["URL"], function(){
			urls=labels;
		});

		casper.then(function(){
			this.eachThen(urls, function(){
				
				var j=++i;
				if (urls[j].Type=='Path'){
					page=main_page;
				} else {
					page=second_page;
				}
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


					check=this.getElementAttribute(page, 'href');
					this.click(page);
					this.echo('clicked the page');

});
				this.then(function(){
					test.assertUrlMatch(check);

					 this.echo('navigated to second page');


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
