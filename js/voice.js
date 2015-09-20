var startVoice = function() {

	var ingredientCount = 0;
    var stepCount = 0;

    var su = new SpeechSynthesisUtterance();
    su.lang = "en-US";

    var howMuch = function(item) {
        su.text = "Please say that again";
        for (var i = 0; i < INGREDIENTS.length; i++)
        {
            if(INGREDIENTS[i].indexOf(item) > -1)
                su.text = INGREDIENTS[i];
        }
        speechSynthesis.speak(su);
    }

    var nextIngredient = function() {
        su.text = INGREDIENTS[ingredientCount];
        speechSynthesis.speak(su);
        setIngredientColors(ingredientCount);
        ingredientCount++;
        if (ingredientCount == INGREDIENTS.length) {
        	ingredientCount = 0;
        }
    }

    var repeatIngredient = function() {
        if(ingredientCount > 0)
            ingredientCount--;
        nextIngredient();
    }

    var lastIngredient = function() {
    	alert(ingredientCount);
        if(ingredientCount > 1)
        {
            ingredientCount--;
            ingredientCount--;
            nextIngredient();
        }
        else if (ingredientCount == 1)
            repeatIngredient();
    }

    var nextStep = function() {
        su.text = STEPS[stepCount];
        speechUtteranceChunker(su, {
   		 chunkLength: 200
		}, function () {
    		//some code to execute when done
    		console.log('done');
	});
        setStepColors(stepCount);
        stepCount++;
        if (stepCount == STEPS.length) {
        	stepCount = 0;
        }
    }

    var repeatStep = function() {
        if(stepCount > 0)
            stepCount--;
        nextStep();
    }

    var lastStep = function() {
        if(stepCount > 1)
        {
            stepCount--;
            stepCount--;
            nextStep();
        }
        else if (stepCount == 1)
            repeatStep();
    }

    var firstIngredient = function() {
        ingredientCount = 0;
        nextIngredient();
    }

    var firstStep = function() {
        stepCount = 0;
        nextStep();
    }

    document.getElementById("nextIngButton").onclick = function() { nextIngredient(); }
    document.getElementById("repeatIngButton").onclick = function() { repeatIngredient(); }
    document.getElementById("lastIngButton").onclick = function() { lastIngredient(); }
	document.getElementById("nextStepButton").onclick = function() { nextStep(); }
    document.getElementById("repeatStepButton").onclick = function() { repeatStep(); }
    document.getElementById("lastStepButton").onclick = function() { lastStep(); }
    document.getElementById("firstStepButton").onclick = function() { firstStep(); }
    document.getElementById("firstIngredientButton").onclick = function() { firstIngredient(); }
    document.getElementById("howMuchButton").onclick = function() { howMuch(document.getElementById("item_input").value); }

	if (annyang) {
		var commands = {
      		'how many *item': howMuch,
      		'how much *item': howMuch,
      		'next ingredient': nextIngredient,
      		'repeat ingredient': repeatIngredient,
      		'last ingredient': lastIngredient,
      		'next step': nextStep,
        	'repeat step': repeatStep,
        	'last step': lastStep,
            'first step': firstStep,
            'first ingredient': firstIngredient
      	}
	}

	annyang.addCommands(commands);

	annyang.start();
}

var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};
