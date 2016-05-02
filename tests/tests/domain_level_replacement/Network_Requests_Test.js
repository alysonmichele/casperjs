require('utils');
var id = require('../test');	

var json = require('../config.json');


var css_class=json.css_class;
var css_id=json.css_id;
var cssTags = [css_class, css_id];
var labels= json["labels"];

// Number replacement works for all activities

	casper.test.begin('Check for number and location request', labels.length*10, function suite(test){
		var urls;
		var original_id, original_class, original_NTR;
		var arrayLength;
		var originals;
		var i = -1;
		var stk_result;
		var loc_result;
		var dr, dl, dt, vp, sr, stv, cb;
		var pid, bid, mln;
		var parameters=[];
		var loc_parameters=[];

		casper.start(labels[0]["URL"], function(){
			urls=labels;
		});

		casper.then(function(){
			this.eachThen(urls, function(){
				
				var j=++i;
				this.echo("Activity: " + urls[j].Type);
				this.thenOpen(urls[j].URL, function(){
					this.echo("URL: " + urls[j].URL);

					//check for NumReq
					casper.waitForResource(function check(resource){
						parameters=[];
						if	(resource.url.indexOf("st?_stk") != -1){
						//	console.log(resource.url);
							dr= resource.url.indexOf("&dr") != -1;
							dl=resource.url.indexOf("&dl") != -1;
							dt=resource.url.indexOf("&dt") != -1;
							vp=resource.url.indexOf("&vp") != -1;
							sr=resource.url.indexOf("&sr") != -1;
							stv=resource.url.indexOf("&stv") != -1;
							cb=resource.url.indexOf("&cb") != -1;
							parameters=[dr,dl,dt,vp,sr,stv,cb];
					}
						
						for (var i=0; i < parameters.length; i++){
							test.assert(parameters[i]);
						}

						return resource.url.indexOf("st?_stk") != -1;
					});

					//check for locations request
					casper.waitForResource(function check(resource){
						loc_parameters=[];
						if (resource.url.indexOf("locations?_stk") != -1){
						//	console.log(resource.url);
							bid= resource.url.indexOf("&bid") != -1;
							pid=resource.url.indexOf("&pid") != -1;
							mln=resource.url.indexOf("&mln") != -1;
							loc_parameters=[bid, pid, mln];
						 }
						 for (var i=0; i < loc_parameters.length; i++){
							test.assert(loc_parameters[i]);
						}
						return resource.url.indexOf("locations?_stk") != -1;
					});



				});

				phantom.clearCookies();
		});
});

		casper.run(function(){
			test.done();
		});
	});
