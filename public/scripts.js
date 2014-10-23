// Whole app

var mealPlan = {};

mealPlan.ingredients = [];

mealPlan.removeFromIngredients = function(element){
    var index = mealPlan.ingredients.indexOf(element.text().toLowerCase());

    mealPlan.ingredients.splice(index, 1);

};

mealPlan.recipes = [];

mealPlan.addRecipe = function(id){

    // add recipe id to mealPlan.recipes array
    mealPlan.recipes.push(id);

    // make AJAX call to get full recipe

    $.ajax({
        url: 'http://api.yummly.com/v1/api/recipe/' + id,
        type: 'GET',
        data: {
            format: 'jsonp',
            _app_key: yumYum.apikey,
            _app_id: yumYum.appId
        },
        dataType: 'jsonp',
        success: function(recipe){
             console.log(recipe);
             // Update "chosenMeals" to display the fetched recipe
             chosenMeals.add(recipe);
        }
    });
};

// No Frills stuff

$('.noFrills .button').on('click', function(){
    if ($(this).hasClass("selected")) {
        // then the person is trying to unselect it.
        $(this).removeClass("selected");

        // remove from mealPlan.ingredients
        mealPlan.removeFromIngredients($(this));

        if (!$.isEmptyObject(mealPlan.ingredients)) {
            yumYum.getRecipes(mealPlan.ingredients);
        }

        // remove from .recipes h2
        yumYum.updateh2();

    } else {
        // the person is trying to select it. Turn it blue...
        $(this).addClass("selected");
        // make its id the lower-case, whitespace-removed version of its text
        $(this).attr("id", $(this).text().replace(/\s/, '').toLowerCase());

        // ... add it to mealPlan.ingredients...
        var ingredient = $(this).text().toLowerCase();
        mealPlan.ingredients.push(ingredient);

        // ...and then make an AJAX call for the ingredient.
        console.log(mealPlan.ingredients);
        yumYum.updateh2();
        yumYum.getRecipes(mealPlan.ingredients);
    }
});

$('.noThanks').on('click', function(){
    $(this).parent().slideUp();
    $(this).remove();
});

// Yummly stuff

var yumYum = {};

yumYum.apikey = "f235b2cf2658a138b83a42670e7c1374";
yumYum.appId = "441e00da";

yumYum.display = $('.recipes ul');

yumYum.ingredientsSpan = $('#ingredients');

yumYum.addButton = $('.manualAdd a');
yumYum.addField = $('#addField');

yumYum.addButton.on('click', function(){
    yumYum.addField.slideDown();
    yumYum.manuallyAdd(yumYum.addField);
});

yumYum.manuallyAdd = function(inputField){

    inputField.keypress(function(event){

        if (event.which === 13){

            var newContent = inputField.val();
            inputField.val("");

            // I'm adding this weird if statement because the program was buggy and kept looping twice, three times, four times on manual add. Don't know why, should figure out.

            if (newContent) {

                mealPlan.ingredients.push(newContent);

                if (inputField.attr("id") == "editField") {

                    inputField.parent().html(newContent + "<a href='#' class='delete' onclick='event.preventDefault();'><i class='fa fa-times-circle'></i></a>");

                    // super sketch about having to put this function here:

                    $('.editable .delete').on('click', function(){

                        // if the ingredient was added from the NoFrills flyer, unhighlight it
                        var editableSpan = $(this).parent();
                        var highlightedSpan = $('#' + editableSpan.text().replace(/\s/, ''));
                        if (highlightedSpan.length) {
                            highlightedSpan.removeClass("selected");
                        }

                        // remove the ingredient from mealPlan.ingredients
                        mealPlan.removeFromIngredients(editableSpan);

                        yumYum.updateh2();

                        if (!$.isEmptyObject(mealPlan.ingredients)) {
                            yumYum.getRecipes(mealPlan.ingredients);
                        }

                    });

                } else { // the input field is "addField" from manual input.

                    yumYum.updateh2();

                    inputField.slideUp();
                }
                
                // fire a new AJAX call for the new ingredients
                yumYum.getRecipes(mealPlan.ingredients);
            }
        }
    });
};

yumYum.updateh2 = function(){

    // if mealPlan.ingredients is empty, make h2 display "..." again; otherwise, update h2 with the new list of ingredients.
    if ($.isEmptyObject(mealPlan.ingredients)) {
        yumYum.ingredientsSpan.html("...");
        yumYum.display.html("");
    } else {
        yumYum.ingredientsSpan.html(
            '<span class="editable">' + mealPlan.ingredients.join('<a href="#" class="delete" onclick="event.preventDefault();"><i class="fa fa-times-circle"></i></a></span> and <span class="editable">') + '<a href="#" class="delete" onclick="event.preventDefault();"><i class="fa fa-times-circle"></i></a></span>'
        );
        $('p.hint').show();
    }
    // I feel like this is not the right place to put this-- ask an instructor!
    $('.editable').dblclick(function(){

        var innerText = $(this).text();

        // temporarily remove the double-clicked ingredient from mealPlan.ingredients
        mealPlan.removeFromIngredients($(this));

        //IF the ingredient was highlighted in the NoFrills flyer
        var highlightedSpan = $('#' + innerText.replace(/\s/, ''));
        if (highlightedSpan.length) {
            highlightedSpan.removeClass("selected");
        }

        // Turn inner text html into an input field CONTAINING the inner text
        $(this).html(
            '<input type="text" id="editField" value="' + innerText + '">'
        );

        yumYum.manuallyAdd($('#editField'));

    });

    $('.editable .delete').on('click', function(){

        // if the ingredient was added from the NoFrills flyer, unhighlight it
        var editableSpan = $(this).parent();
        var highlightedSpan = $('#' + editableSpan.text().replace(/\s/, ''));
        if (highlightedSpan.length) {
            highlightedSpan.removeClass("selected");
        }

        // remove the ingredient from mealPlan.ingredients
        mealPlan.removeFromIngredients(editableSpan);

        yumYum.updateh2();

        if (!$.isEmptyObject(mealPlan.ingredients)) {
            yumYum.getRecipes(mealPlan.ingredients);
        }

    });

};

yumYum.getRecipes = function(ingredient){
	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		data: {
			format: 'jsonp',
			_app_key: yumYum.apikey,
			_app_id: yumYum.appId,
			allowedIngredient: ingredient
		},
		dataType: 'jsonp',
		success: function(result){
			 console.log(result.matches);
             yumYum.displayRecipes(result.matches);
		}
	});
};

yumYum.displayRecipes = function(recipes){
    // clear the current 'recipes' div
    yumYum.display.html("");

    // update the recipes div
    $.each(recipes, function(i, recipe){
        console.log(recipe);
        var title = $('<h3>').text(recipe.recipeName);
        var source = $('<p>').text("From " + recipe.sourceDisplayName);
        if (recipe.smallImageUrls){
            var image = $('<img>').attr('src', recipe.smallImageUrls[0]);
        } else {
            var image = $('<img>');
        }
        var ingredients = $('<ul>').html("<li>" + recipe.ingredients.join("</li><li>") + "</li>");
        var add = $('<a>').html('<i class="fa fa-plus"></i> Add Recipe to Meal Plan').attr({
            href: '#',
            onclick: "event.preventDefault(); mealPlan.addRecipe('" + recipe.id + "');"
        });
        var noThanks = $('<a href="#" onclick="event.preventDefault();" class="noThanks">').append($('<i class="fa fa-times">'));
        yumYum.display.append($('<li class="recipe">').append(title, source, image, ingredients, add, noThanks));
    });

    $('.noThanks').on('click', function(){
        $(this).parent().slideUp();
        $(this).remove();
    });
};

// "Chosen Meals" section stuff

var chosenMeals = {};

chosenMeals.list = $('.chosenMeals ul');

chosenMeals.add = function(recipe){
    var title = $('<h3>').text(recipe.name);
    var source = $('<p>').html(
        "<a href='" +
        recipe.source.sourceRecipeUrl +
        "'>Original Recipe</a> from <a href='" + 
        recipe.source.sourceSiteUrl + 
        "'>" + 
        recipe.source.sourceDisplayName +
        "</a>"
    );

    if (recipe.images.length) {
        var image = $('<img>').attr('src', recipe.images[0].hostedLargeUrl);
    } else {
        var image = $('<img>');
    }

    var recipeYield = $('<p>').html("Yield: " + recipe.yield);
    var time = $('<p>').html("Total time: " + recipe.totalTime);
    var ingredients = $('<ul>').html("<li>" + recipe.ingredientLines.join("</li><li>") + "</li>");

    var attribution = $('<span>').html(recipe.attribution.html);

    var noThanks = $('<a href="#" onclick="event.preventDefault();" class="noThanks">').append($('<i class="fa fa-times">'));

    chosenMeals.list.append($('<li class="meal">').append(title, source, image, recipeYield, time, ingredients, attribution, noThanks));

    $('.noThanks').on('click', function(){
        $(this).parent().slideUp();
        $(this).remove();
    });
};
