function iframeRef( frameRef ) {
    return frameRef.contentWindow
        ? frameRef.contentWindow.document
        : frameRef.contentDocument
}

document.getElementById('myFrame').onload = function() {
	parse();
};

function parse(){
	//var inside = iframeRef( document.getElementById('myFrame') );
	//if (!inside) console.log("OH SHIT WE ARE ALL DEAD hey watch the language this is a family show :D ");
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
}
/*
92e7205d643ca6c0791e9fd4a73ed16f



$.ajax({
	method: 'GET',
	url: 'http://food2fork.com/api/search?key=92e7205d643ca6c0791e9fd4a73ed16f&q=',
	dataType: 'JSON',
	success: function(response){
		console.log(response);
	}




/*
function makeQuery(e){
  e.preventDefault(); // do not send off form
  var container = document.body');
  var location = document.getElementById('query').value || 'SFO';
  var content = '';

  var BASE_URI = 'http://query.yahooapis.com/v1/yql';

  // function calling the opensocial makerequest method
  function runQuery(query, handler) {
    gadgets.io.makeRequest(BASE_URI, handler, {
        METHOD: 'POST',
        POST_DATA: toQueryString({q: query, format: 'json'}),
        CONTENT_TYPE: 'JSON',
        AUTHORIZATION: 'OAuth'
    });
  };

  // Tool function to create a request string
  function toQueryString(obj) {
    var parts = [];
    for(var each in obj) if (obj.hasOwnProperty(each)) {
      parts.push(encodeURIComponent(each) + '=' +
                 encodeURIComponent(obj[each]));
    }
    return parts.join('&');
  };

  // Run YQL query to GeoPlanet API and extract data from response
  runQuery('select * from geo.places where text="' + location + '"',
    function(rsp) {
      if(rsp.data){
        var place = rsp.data.query.results.place;
        if(place[0]){
          place = place[0];
        }
        var name      = place.name || 'Unknown';
        var country   = place.country.content || place[0].country.content ||
                        'Unknown';
        var latitude  = place.centroid.latitude || 'Unknown';
        var longitude = place.centroid.longitude || 'Unknown';
        var city      = place.locality1.content || 'Unknown';
        var state     = place.admin1.content || 'Unknown';
        var county    = place.admin2.content || 'Unknown';
        var zip       = place.postal ? place.postal.content : 'Unknown';

        content = '<ul><li><strong>Place Name: </strong>' + name + '</li>'+
        '<li><strong>City/Town: </strong>' + city + '</li>' +
        '<li><strong>County/District: </strong>' + county + '</li>' +
        '<li><strong>State/Province: </strong>' + state + '</li>' +
        '<li><strong>Zipcode: </strong>' + zip + '</li>' +
        '<li><strong>Country: </strong>' + country + '</li>' +
        '<li><strong>Latitude: </strong>' + latitude + '</li>' +
        '<li><strong>Longitude: </strong>' + longitude + '</li></ul>';
        container.innerHTML = content;
      }
      else {
        container.innerHTML = gadgets.json.stringify(rsp);
      }
  });
}
// Create an event handler for submitting the form
var form = document.getElementById('geosearch');
form.addEventListener('submit',makeQuery,false);
*/