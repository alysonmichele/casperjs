var require = patchRequire(require);

exports.getId=function(){
	var css_id= document.getElementById("id_number");
	return css_id.innerHTML;
}

exports.getClass=function(){
	var css_class= document.getElementsByClassName("class_number")[0];
    return css_class.innerHTML;
}

exports.getNTR = function(){
    var ntr = document.getElementById("NTR_number");
    return ntr.innerHTML;
}

exports.getOriginals = function(){
	var original_id, original_class, original_NTR;
	var originals;
	original_id=getId();
	original_class=getClass();
	original_NTR=getNTR();
	originals = [original_NTR, original_class, original_id];
	return originals;

}

exports.checkForChange = function(test, q, x) {
	test.assertSelectorDoesntHaveText(q, x);
}

exports.checkForChangePageTwo = function(test, q, x) {
	test.assertSelectorHasText(q, x);
}

exports.getFormattedElements = function(){
	var elements = document.getElementsByClassName("formatted");
	var num = [];
	var y;
	for (var i =0; i < elements.length; i++){
		y=elements[i].innerHTML;
		num.push(y);
	}
	return num;
}

exports.checkFormat = function(test, q, z){
	var spaces = new RegExp("\\d{3}\\s\\d{3}\\s\\d{4}");
	var dashes = new RegExp("\\d{3}[-]\\d{3}[-]\\d{4}");
	var paren_spaces = new RegExp("[(]\\d{3}[)]\\s\\d{3}\\s\\d{4}");
	var paren_no_spaces = new RegExp("[(]\\d{3}[)]\\d{3}\\d{4}");
	var paren_no_spaces_dash = new RegExp("[(]\\d{3}[)]\\d{3}[-]\\d{4}");
	var paren_no_spaces_dash_one = new RegExp("[1][(]\\d{3}[)]\\d{3}[-]\\d{4}");
	var paren_space_dash = new RegExp("[(]\\d{3}[)]\\s\\d{3}[-]\\d{4}");
	var none = new RegExp("\\d{10}");
	var none_one = new RegExp("[1]\\d{10}");
	var paren_spaces_one = new RegExp("[1]\\s[(]\\d{3}[)]\\s\\d{3}\\s\\d{4}");
	var dashes_one = new RegExp("[1][-]\\d{3}[-]\\d{3}[-]\\d{4}");
	var spaces_one = new RegExp("[1]\\d{3}\\s\\d{3}\\s\\d{4}");
	var paren_onespace_dash_one = new RegExp("[1]\\s[(]\\d{3}[)]\\d{3}[-]\\d{4}");
	var paren_spaces_dash_one = new RegExp("[1]\\s[(]\\d{3}[)]\\s\\d{3}[-]\\d{4}");
	var result;
	
	// var paren_one
	
	var regList= [spaces, dashes, paren_spaces, paren_no_spaces,
	paren_no_spaces_dash, paren_space_dash, none, none_one, dashes_one, spaces_one, 
	paren_spaces_dash_one, paren_spaces_one, paren_no_spaces_dash_one, paren_onespace_dash_one];
	var reg;
	var t=0;

//loop through the various regexes to see if the new format matches the old format
	while ( t < regList.length){
		reg=regList[t];
		if ((reg.test(q)) && (reg.test(z))){
			result=true;
			break;
		} else {
			t=t+1;
		}
	}
	//if we didn't hit a match, then result is false
	if (result!=true){
		result=false;
	}

	//casper check to see if we've found a match for the numbers
	test.assert(result);
	}