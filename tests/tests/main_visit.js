
function getID(){
	var css_id= document.getElementById("id_number");
    return css_id.innerHTML;
}

function getClass(){
	var css_class= document.getElementsByClassName("class_number")[0];
    return css_class.innerHTML;
}

function getNTR(){
    var ntr = document.getElementById("NTR_number");
    return ntr.innerHTML;
}
casper.test.begin('Check Direct Visit', 3, function(test){
	var main_number= '555-555-5555'
	var url= 'http://portal.ifbyphone.local/aly/index.html'
	var original_id;
	var original_class;
	var original_NTR;

	casper.start(url, function() {

		original_id=this.evaluate(getID);
		this.echo(original_NTR);
		original_class=this.evaluate(getClass);
		original_NTR=this.evaluate(getNTR);

	});
		casper.wait(3000, function(){
				test.assertSelectorHasText('div#NTR_number', original_NTR);

				test.assertSelectorHasText('div#id_number', original_id);

				test.assertSelectorHasText('div.class_number', original_class);


		}).
		run(function(){
		test.done();
		phantom.clearCookies();
});

});

