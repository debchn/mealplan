// Whole app

var mealPlan = {};

// selected ingredients
mealPlan.ingredients = [];

// favourited recipes
mealPlan.recipes = [];

// Yummly stuff
mealPlan.apikey = "f235b2cf2658a138b83a42670e7c1374";
mealPlan.appId = "441e00da";

// jQuery selectors
mealPlan.saleItems = $('.noFrills li');
mealPlan.chosenMeals = $('.chosenMeals ul');
mealPlan.generatedRecipesList = $('.recipes ul');
mealPlan.ingredientsSpan = $('#ingredients');
mealPlan.manualAddButton = $('.manualAdd a');
mealPlan.manualAddField = $('#addField');

mealPlan.nonHumanFood = ["anti-perspirant", "bathroom", "batteries", "body wash", "candle", "cat food", "conditioner", "crest", "cup of soup", "delissio", "dentyne", "detergent", "dial", "diapers", "dishwashing", "dog food", "foil", "garbage", "gilette", "hair care", "head & shoulders", "herbal essences", "lean cuisine", "litter", "lubriderm", "pads", "pampers", "paper towel", "poinsettia", "q-tips", "shampoo", "shower", "snack bars", "snuggle", "soap", "sunsilk", "sunlight", "superfries", "tampons", "tissue", "toilet", "toothbrush", "toothpaste", "vitamins", "whiskas", "ziploc"];

mealPlan.removeNonFood = function(element){

    for (index in mealPlan.nonHumanFood) {
        if (element.html().toLowerCase().indexOf(mealPlan.nonHumanFood[index]) != -1) {
            element.css("display", "none");
            return;
        }
    }
};

mealPlan.compoundWords = {
    "apples"    : ["mcintosh apples"],
    "bacon"     : ["peameal bacon"],
    "beans"     : ["black beans", "butter beans", "fava beans", "garbanzo beans", "green beans", "jelly beans", "kidney beans", "lima beans", "pinto beans", "soy beans", "string beans"],
    "beef"      : ["beef brisket", "ground beef"],
    "brownie"   : ["brownie mix"],
    "butter"    : ["almond butter", "peanut butter", "butter tarts"],
    "cake"      : ["cake mix"],
    "cheese"    : ["cheddar cheese", "cottage cheese", "cream cheese", "feta cheese", "gouda cheese", "processed cheese", "shredded cheese", "swiss cheese"],
    "chicken"   : ["chicken breasts", "chicken nuggets", "chicken strips", "chicken thighs", "chicken wings", "chicken noodle soup"],
    "chips"     : ["potato chips", "pita chips", "chocolate chips"],
    "chocolate" : ["chocolate bars", "chocolate chips", "milk chocolate", "chocolate milk", "hot chocolate", "chocolate orange"],
    "cocktail"  : ["cranberry cocktail", "fruit cocktail", "V8 cocktail", "vegetable cocktail"],
    "coffee"    : ["instant coffee", "ground coffee"],
    "cream"     : ["ice cream", "sour cream", "whipped cream", "whipping cream", "cream of mushroom"],
    "dill"      : ["dill pickles"],
    "fish"      : ["fish fillets"],
    "ginger"    : ["ginger ale"],
    "juice"     : ["apple juice", "cranberry juice", "orange juice", "tomato juice"],
    "lettuce"   : ["iceberg lettuce", "romaine lettuce"],
    "milk"      : ["evaporated milk", "coconut milk"],
    "oil"       : ["canola oil", "olive oil", "peanut oil", "sesame oil", "vegetable oil"],
    "onions"    : ["french fried onions", "green onions", "red onions", "yellow onions"],
    "oranges"   : ["blood oranges", "mandarin oranges", "navel oranges"],
    "peas"      : ["black-eyed peas", "black eyed peas", "chick peas", "split peas"],
    "pepper"    : ["cayenne pepper"],
    "peppers"   : ["bell peppers", "chili peppers", "jalapeno peppers"],
    "popcorn"   : ["popcorn shrimp", "popcorn chicken"],
    "pork"      : ["pork chops", "pork shoulder"],
    "potatoes"  : ["baking potatoes", "mashed potatoes", "sweet potatoes"],
    "powder"    : ["chili powder", "curry powder", "garlic powder"],
    "rice"      : ["jasmine rice", "basmati rice", "brown rice", "rice cakes"],
    "sauce"     : ["barbecue sauce", "bbq sauce", "oyster sauce", "pasta sauce", "plum sauce", "soy sauce", "sweet and sour sauce", "tomato sauce"],
    "sprouts"   : ["alfalfa sprouts", "brussels sprouts", "bean sprouts"],
    "sugar"     : ["brown sugar", "icing sugar", "powdered sugar"],
    "tea"       : ["black tea", "green tea", "iced tea", "jasmine tea", "orange pekoe tea"],
    "yogurt"    : ["frozen yogurt"]
};

mealPlan.foodWords = [ "alfalfa", "almonds", "anchovies", "anise", "apricots", "artichoke", "asparagus", "aspic", "avocado", "bagels", "bamboo shoots", "bananas", "barley", "basa", "basil", "bean curd", "beets", "biscuits", "blackberries", "blueberries", "boysenberries", "bran", "bread", "brie", "brisket", "broccoli", "brownies", "buckwheat", "buns", "camembert", "candy", "cantaloupe", "capers", "caramel", "carrots", "cashews", "cassava", "cauliflower", "caviar", "celery", "cereal", "chard", "cheesecake", "cherries", "chickpeas", "chili", "chives", "chocolates", "chutney", "cilantro", "cinnamon", "clam", "clamato", "clams", "clementines", "cloves", "coca-cola", "coconut", "cod", "coleslaw", "collard greens", "cookies", "cool whip", "corn", "cornflakes", "cornmeal", "crab", "crackers", "cream", "cucumbers", "cupcakes", "curds", "currants", "custard", "daikon", "dandelion greens", "dates", "dill", "donuts", "donut", "doughnuts", "dragonfruit", "dressing", "duck", "durian", "eggs", "egg nog", "eggplant", "elderberries", "endives", "figs", "five alive", "flax", "flour", "french fries", "fritters", "frosting", "fruitopia", "garlic", "gelatin", "ginger", "gingerale", "gingerbread", "gouda", "granola", "grapes", "grapefruit", "gravy", "guacamole", "guava", "haddock", "halibut", "ham", "hamburger", "hazelnuts", "honey", "honeydew", "horseradish", "hot dog", "hot sauce", "hummus", "ice cream", "jackfruit", "jalapeno", "jam", "jelly", "jellybeans", "jicama", "kale", "kebabs", "ketchup", "kiwi", "kohlrabi", "kool-aid", "kumquat", "lamb", "lard", "lasagna", "lemons", "lemonade", "lentils", "lettuce", "licorice", "limes", "liver", "lobster", "lollipops", "lox", "lunch meat", "luncheon meat", "lychee", "macaroni", "macaroons", "mangoes", "maple syrup", "margarine", "marmalade", "mayonnaise", "meatball", "meatballs", "meatloaf", "melon", "melons", "meringue", "milk", "mint", "mints", "miracle whip", "molasses", "mozzarella", "muffins", "mushrooms", "mussels", "mustard",  "naan", "nectarines", "nestea", "noodles", "nuts", "nutmeg", "oats", "oatmeal", "oil", "okra", "olives", "onions", "oranges", "oregano", "oysters", "pancake mix", "paneer", "papaya", "parsley", "parsnip", "pasta", "pastries", "peaches", "peanuts", "peanut butter", "pears", "pecans", "penne", "pepper", "peppers", "pepperoni", "pepsi", "persimmons", "pickles", "pie", "pineapple", "pineapples", "pita", "plums", "pomegranates", "popsicles", "potatoes", "pretzels", "prime rib", "prosciutto", "prunes", "pudding", "pumpernickel", "pumpkin", "punch", "quiche", "quinoa", "radishes", "raisins", "raspberries", "ravioli", "relish", "rhubarb", "ribs", "rice", "rolls", "romaine", "rosemary", "rye", "saffron", "sage", "salad", "salami", "salmon", "salsa", "salt", "sauerkraut", "sausage", "sausages", "scallops", "seaweed", "seeds", "sesame", "shallots", "sherbet", "shortening", "shrimp", "slaw", "soda", "sole", "sorbet", "soup mix", "soy", "spaghetti", "spaghettini", "spareribs", "spinach", "sprinkles", "sprouts", "squash", "squid", "steak", "strawberries", "strudel", "sugar", "sunflower seeds", "taco", "tamales", "tangerine", "tapioca", "taro", "tarragon", "tea", "teriyaki", "thyme", "tilapia", "toffee", "tofu", "tomatoes", "tortilla", "trout", "tuna", "turkey", "turmeric", "turnip", "vanilla", "veal", "vegetables", "venison", "vinegar", "wafers", "waffles", "walnuts", "wasabi", "water chestnuts", "watercress", "watermelon", "whey", "weiners", "wieners", "yam", "yeast", "zucchini" ];

mealPlan.linkFoodItems = function(element){
    var str = element.html();

    for (key in mealPlan.compoundWords){
        // if the element contains the key word
        var re = new RegExp(("\\s" + key + "\\s"), "i");
        if (str.search(re) !== -1) {
            // check to see if the element contains any of the compound words. else, just highlight the key word.
            var wordToWrap = mealPlan.checkForCompound(key, mealPlan.compoundWords[key], str);
            str = str.replace(wordToWrap, " <a class='button' href='#' onclick='event.preventDefault();'>$&</a> ");
            element.html(str);
        }
    }

    for (index in mealPlan.foodWords) {
        var re = new RegExp(("\\s" + mealPlan.foodWords[index] + "\\s"), "i");
        if (str.search(re) !== -1) {
            str = str.replace(new RegExp(mealPlan.foodWords[index], "i"), " <a class='button' href='#' onclick='event.preventDefault();'>$&</a> ");
            element.html(str);
        }
    }
};

mealPlan.checkForCompound = function(word, compoundWords, string){
    // receives the single word and the array of compound words associated with the single word. returns which match is in the string.
    for (index in compoundWords) {
        var re = new RegExp(("\\s" + compoundWords[index] + "\\s"), "i");
        if (string.search(re) !== -1) { 
            return new RegExp(compoundWords[index], "i"); 
        };
    }
    re = new RegExp(word, "i");
    return re;
};

$('.noThanks').on('click', function(){
    $(this).parent().slideUp();
    $(this).remove();
});

mealPlan.manualAddButton.on('click', function(){
    mealPlan.manualAddField.slideDown();
    mealPlan.manuallyAdd(mealPlan.manualAddField);
});

// Functions

mealPlan.removeFromIngredients = function(element){
    var index = mealPlan.ingredients.indexOf(element.text().toLowerCase());
    mealPlan.ingredients.splice(index, 1);
};

mealPlan.addRecipe = function(id){

    // add recipe id to mealPlan.recipes array
    mealPlan.recipes.push(id);

    // make AJAX call to get full recipe

    $.ajax({
        url: 'https://api.yummly.com/v1/api/recipe/' + id,
        type: 'GET',
        data: {
            format: 'jsonp',
            _app_key: mealPlan.apikey,
            _app_id: mealPlan.appId
        },
        dataType: 'jsonp',
        success: function(recipe){
             console.log(recipe);
             // Update ".chosenMeals" to display the fetched recipe
             mealPlan.addFavourite(recipe);
        }
    });
};

mealPlan.manuallyAdd = function(inputField){

    inputField.keypress(function(event){

        if (event.which === 13){

            var newContent = inputField.val();
            inputField.val("");

            // I'm adding this weird if statement because the program was buggy and kept looping twice, three times, four times on manual add. Don't know why, should figure out.

            if (newContent) {

                mealPlan.ingredients.push(newContent);

                if (inputField.attr("id") == "editField") {

                    inputField.parent().html(newContent + "<a href='#' class='delete' onclick='event.preventDefault();'><i class='fa fa-times'></i></a>");

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

                        mealPlan.updateh2();

                        if (!$.isEmptyObject(mealPlan.ingredients)) {
                            mealPlan.getRecipes(mealPlan.ingredients);
                        }

                    });

                } else { // the input field is "addField" from manual input.

                    mealPlan.updateh2();

                    inputField.slideUp();
                }
                
                // fire a new AJAX call for the new ingredients
                mealPlan.getRecipes(mealPlan.ingredients);
            }
        }
    });
};

mealPlan.updateh2 = function(){

    // if mealPlan.ingredients is empty, make h2 display "..." again; otherwise, update h2 with the new list of ingredients.
    if ($.isEmptyObject(mealPlan.ingredients)) {
        mealPlan.ingredientsSpan.html("...");
        mealPlan.generatedRecipesList.html("");
    } else {
        mealPlan.ingredientsSpan.html(
            '<span class="editable">' + mealPlan.ingredients.join('<a href="#" class="delete" onclick="event.preventDefault();"><i class="fa fa-times"></i></a></span> and <span class="editable">') + '<a href="#" class="delete" onclick="event.preventDefault();"><i class="fa fa-times"></i></a></span>'
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

        mealPlan.manuallyAdd($('#editField'));

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

        mealPlan.updateh2();

        if (!$.isEmptyObject(mealPlan.ingredients)) {
            mealPlan.getRecipes(mealPlan.ingredients);
        }

    });

};

mealPlan.getRecipes = function(ingredient){
	$.ajax({
		url: 'https://api.yummly.com/v1/api/recipes',
		type: 'GET',
		data: {
			format: 'jsonp',
			_app_key: mealPlan.apikey,
			_app_id: mealPlan.appId,
			allowedIngredient: ingredient
		},
		dataType: 'jsonp',
		success: function(result){
             console.log("here I'm logging just 'result':");
             console.log(result);
			 console.log(result.matches);
             mealPlan.displayRecipes(result.matches);
		}
	});
};

mealPlan.displayRecipes = function(recipes){
    // clear the current 'recipes' div
    mealPlan.generatedRecipesList.html("");

    // update the recipes div
    $.each(recipes, function(i, recipe){
        console.log(recipe);
        var title = $('<h3>').text(recipe.recipeName);
        var source = $('<p>').text("From " + recipe.sourceDisplayName).attr('class', 'from');
        if (recipe.smallImageUrls){
            var image = $('<img>').attr('src', recipe.smallImageUrls[0]);
        } else {
            var image = $('<img>');
        }
        // var ingredients = $('<ul>').html("<li>" + recipe.ingredients.join("</li><li>") + "</li>");
        var ingredients = $('<p>').text("Ingredients: " + recipe.ingredients.join(", ")).attr('class', 'ings');
        //var add = $('<a>').html('<i class="fa fa-plus"></i> Add Recipe to Meal Plan').attr({
        var more = $('<a>').html('<i class="fa fa-plus"></i> See More').attr({
            href: '#',
            class: 'seeMore',
            id: recipe.id,
            onclick: 'event.preventDefault();'
        });
        var fav = $('<a>').html('<i class="fa fa-star-o"></i> Favourite').attr({
            href: '#',
            class: 'fav',
            onclick: "event.preventDefault(); mealPlan.addRecipe('" + recipe.id + "');"
        });
        var noThanks = $('<a href="#" onclick="event.preventDefault();" class="noThanks">').append($('<i class="fa fa-times">'));
        // mealPlan.generatedRecipesList.append($('<li class="recipe">').append(title, source, image, ingredients, add, noThanks));
        mealPlan.generatedRecipesList.append($('<li class="recipe">').append(title, source, image, ingredients, more, fav, noThanks));
    });

    $('.seeMore').on('click', function(){
        $.ajax({
            url: 'https://api.yummly.com/v1/api/recipe/' + $(this).attr('id'),
            type: 'GET',
            data: {
                format: 'jsonp',
                _app_key: mealPlan.apikey,
                _app_id: mealPlan.appId
            },
            dataType: 'jsonp',
            success: function(recipe){
                 console.log(recipe);
                 // eventually make this slide down:
                 mealPlan.displayDetails(recipe);
            }
        });
    });

    $('.fav').on('click', function(){
        $(this).html('<i class="fa fa-star"></i> Favourited').addClass('favourited');

        $('.favourited').on('click', function(){
            $(this).html('<i class="fa fa-star-o"></i> Favourite').removeClass('favourited');
        });
    });

    $('.noThanks').on('click', function(){
        $(this).parent().slideUp();
        $(this).remove();
    });
};

mealPlan.displayDetails = function(recipe){

    var seeMoreLink = $('#' + recipe.id);
    seeMoreLink.siblings('.from').html("<a href='" +
        recipe.source.sourceRecipeUrl +
        "'>Original Recipe</a> from <a href='" + 
        recipe.source.sourceSiteUrl + 
        "'>" + 
        recipe.source.sourceDisplayName +
        "</a>");

    var recipeImage = seeMoreLink.siblings('img');

    if (recipe.images.length) {
        recipeImage.attr('src', recipe.images[0].hostedLargeUrl);
    }

    if (recipe.yield) {
        recipeImage.after($('<p>').html(recipe.yield),
        $('<p>').html("Total time: " + recipe.totalTime));
    } else {
        recipeImage.after($('<p>').html("Total time: " + recipe.totalTime));
    }

    var ingredients = $('<ul>').html("<li>" + recipe.ingredientLines.join("</li><li>") + "</li>");
    seeMoreLink.siblings('.ings').replaceWith(ingredients);

    seeMoreLink.replaceWith($('<p>').html(recipe.attribution.html));

}

mealPlan.addFavourite = function(recipe){
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

    mealPlan.chosenMeals.append($('<li class="meal">').append(title, source, image, recipeYield, time, ingredients, attribution, noThanks));

    $('.noThanks').on('click', function(){
        $(this).parent().slideUp();
        $(this).remove();
    });
};

$(function(){

    mealPlan.saleItems.each(function(i, e){
        var e = $(e);
        mealPlan.removeNonFood(e);
        mealPlan.linkFoodItems(e);
    });

    $('.noFrills .button').on('click', function(){
        if ($(this).hasClass("selected")) {
            // then the person is trying to unselect it.
            $(this).removeClass("selected");

            // remove from mealPlan.ingredients
            mealPlan.removeFromIngredients($(this));

            if (!$.isEmptyObject(mealPlan.ingredients)) {
                mealPlan.getRecipes(mealPlan.ingredients);
            }

            // remove from .recipes h2
            mealPlan.updateh2();

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
            mealPlan.updateh2();
            mealPlan.getRecipes(mealPlan.ingredients);
        }
    });

});
