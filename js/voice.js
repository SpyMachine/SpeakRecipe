var startVoice = function() {

	var ingredientCount = 0;
    var stepCount = 0;

    var su = new SpeechSynthesisUtterance();

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
        ingredientCount++;
    }

    var repeatIngredient = function() {
        if(ingredientCount > 0)
            ingredientCount--;
        nextIngredient();
    }

    var lastIngredient = function() {
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
        speechSynthesis.speak(su);
        stepCount++;
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

	if (annyang) {
		var commands = {
      		'how many *item': howMuch,
      		'how much *item': howMuch,
      		'next ingredient': nextIngredient,
      		'repeat ingredient': repeatIngredient,
      		'last ingredient': lastIngredient,
      		'next step': nextStep,
        	'repeat step': repeatStep,
        	'last step': lastStep
      	}
	}

	annyang.addCommands(commands);

	annyang.start();
}
