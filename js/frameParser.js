function iframeRef( frameRef ) {
    return frameRef.contentWindow
        ? frameRef.contentWindow.document
        : frameRef.contentDocument
}

var inside = iframeRef( document.getElementById('one') );
var ingredientsListsParent = document.getElementsByClassName('recipe-ingred_txt');
var ilist = [];
var thisIngredient;	
for (var i=0; i<ingredientsListParent.length; i++){
		thisIngredient = ingredientsListParent[i];
		ilist.push(thisIngredient.innerHTML);
}
console.log(ilist);
var stepparents = document.getElementsByClassName('recipe-directions__list--item');
var steps = [];
for (var i=0; i<stepparents.length; i++){
		thisstep = stepparents[i];
		steps.push(thisstep.innerHTML.replace(/"/g,""));
}
	
console.log(steps);
