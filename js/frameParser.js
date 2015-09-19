var STEPS = [], INGREDIENTS = [];

function iframeRef( frameRef ) {
    return frameRef.contentWindow
        ? frameRef.contentWindow.document
        : frameRef.contentDocument
}

//Access the DOM of the loaded iframe
document.getElementById('myFrame').onload = function() {	
	var thedom = iframeRef(document.getElementById('myFrame'));	
	parse(thedom);
	startVoice();
};

//parse through the dom for ingredients and steps
function parse(thedom){

	//Find ingredients
	var ingredientsListParent = thedom.getElementsByClassName('recipe-ingred_txt');
	var thisIngredient;	
	for (var i=0; i<ingredientsListParent.length; i++){
		var iname = ingredientsListParent[i].innerText;
		if (iname != undefined && iname != "Add all ingredients to list"){
			INGREDIENTS.push(iname);
		}
	}
	
	//Find steps
	var stepparents = thedom.getElementsByClassName('recipe-directions__list--item');
	for (var i=0; i<stepparents.length; i++){
			thisstep = stepparents[i].innerText;
			STEPS.push(thisstep);
	}
	
	console.log(INGREDIENTS);
	console.log(STEPS);
}

function loadPages(){
	var url = document.getElementById("url_input");
	
	$.ajax({
		method: "POST",
		url: 'getDOM.php',
		data: {
			url: url.value
		},
		success: function(response){
			document.getElementById('myFrame').setAttribute('src', 'files/thisdom.html');
		}
	});		
}
