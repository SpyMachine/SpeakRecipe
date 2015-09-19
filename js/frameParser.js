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
	
	var ilist = document.getElementById("ilist");
	var slist = document.getElementById("slist");
	while(ilist.hasChildNodes()){
		ilist.removeChild(ilist.firstChild);
	}
	while(slist.hasChildNodes()){
		slist.removeChild(slist.firstChild);
	}	
	
	var title,img,li;
	title=thedom.getElementsByClassName('recipe-summary__h1')[0].innerText;
	var toprow = document.getElementById('toprow');
	var header = document.createElement('h1');
		header.appendChild(document.createTextNode(title));
		header.className = 'text-center';
	toprow.insertBefore(header, toprow.firstChild);
	
	img = thedom.getElementsByClassName('rec-photo')[0].src;
	
	ourimg = document.createElement('img');
		ourimg.src = img;
		ourimg.style.width = '500px';
	document.getElementById('picture').appendChild(ourimg);
	
	var listParent = document.createElement('ul');
		listParent.appendChild(document.createTextNode('List of ingredients:'));
	for (var i = 0; i<INGREDIENTS.length;i++){
		if(INGREDIENTS[i].trim()=="") continue;
		li = document.createElement('li');
			li.style.color='grey';
			li.appendChild(document.createTextNode(INGREDIENTS[i]));
		listParent.appendChild(li);
	}
	ilist.appendChild(listParent);
	
	listParent = document.createElement('ol');
		listParent.appendChild(document.createTextNode('Instructions:'));
	for (var i = 0; i<STEPS.length;i++){
		if(STEPS[i].trim()=="") continue;
		li = document.createElement('li');
			li.style.color='grey';
			li.appendChild(document.createTextNode(STEPS[i]));
		listParent.appendChild(li);
	}
	slist.appendChild(listParent);
		
	console.log(INGREDIENTS);
	console.log(STEPS);
}

function setStepColors(idx){
	var slist = document.getElementById("slist").firstChild.getElementsByTagName('li');
	for(var i=0; i<slist.length; i++){
		slist[i].style.color = (i==idx ? "green" : "grey");
	}
}
function setIngredientColors(idx){
	var ilist = document.getElementById("ilist").firstChild.getElementsByTagName('li');
	for(var i=0; i<ilist.length; i++){
		ilist[i].style.color = (i==idx ? "green" : "grey");
	}
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

document.getElementById('submitButton').onclick = function(){ loadPages(); };
