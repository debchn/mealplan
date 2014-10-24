require 'sinatra'
require 'mechanize'

set :server, 'webrick'

def human_food_only(groceries)
	not_human_food = ["Detergent", "Soap", "Candle", "Shower", "Shampoo", "Conditioner", "Sunsilk", "Dishwashing", "Bathroom", "Tissue", "Toilet", "Pads", "Tampons", "Q-Tips", "Body Wash", "Toothpaste", "Toothbrush", "Hair Care", "Cat Food", "Dog Food", "Garbage", "Pampers", "Diapers"]
	human_food = groceries.dup
	
	groceries.each do |item|
		not_human_food.each do |thing|
			if (item.search('b').text.include? thing)
				human_food.delete(item)
			end
		end
	end
	human_food
end

# def wrap_words_in_span(string)
# 	spanned_string = ""

# 	for word in string.split
# 		spanned_string += "<span>" + word + "</span> "
# 	end

# 	spanned_string
# end

def wrap_food_in_link(string)

	# make sure that compound word foods--e.g. evaporated milk, orange juice--are encapsulated in ONE button rather than just one smaller word ('milk') or two separate word buttons ('orange' and 'juice'). We also need to leave the compound word phrase alone once we have encapsulated it in a span --i.e. don't loop back over it and encapsulate the smaller words in spans, too.

	compound_word_list = {

		"apples"	=> ["mcintosh apples"],

		"bacon"		=> ["peameal bacon"],

		"beans"     => ["black beans",
						"butter beans",
						"fava beans",
						"garbanzo beans",
						"green beans",
						"jelly beans",
						"kidney beans",
						"lima beans",
						"pinto beans",
						"soy beans",
						"string beans"],

		"beef"	    => ["beef brisket",
						"ground beef"],

		"brownie"   => ["brownie mix"],

		"butter"	=> ["almond butter",
						"peanut butter"],

		"cake"      => ["cake mix"],

		"cheese"    => ["cheddar cheese",
						"cottage cheese",
					    "cream cheese",
					    "feta cheese",
					    "gouda cheese",
					    "processed cheese",
					    "shredded cheese",
					    "swiss cheese"],

		"chicken"   => ["chicken breasts",
						"chicken nuggets",
					    "chicken strips",
					    "chicken thighs",
					    "chicken wings"],

		"chips"		=> ["potato chips",
						"pita chips",
						"chocolate chips"],		

		"chocolate" => ["chocolate bars",
						"chocolate chips",
						"milk chocolate"],

		"cocktail"	=> ["cranberry cocktail",
						"fruit cocktail",
						"V8 cocktail",
						"vegetable cocktail"],

		"coffee"    => ["instant coffee",
		 				"ground coffee"],

		"cream"		=> ["ice cream",
						"sour cream",
						"whipped cream",
						"whipping cream"],

		"dill"		=> ["dill pickles"],

		"ginger"	=> ["ginger ale"],

		"juice"		=> ["apple juice",
						"cranberry juice",
						"orange juice",
						"tomato juice"],

		"lettuce"	=> ["iceberg lettuce",
						"romaine lettuce"],

		"milk"		=> ["evaporated milk"],

		"oil"		=> ["canola oil",
						"olive oil",
						"peanut oil",
						"sesame oil",
						"vegetable oil"],

		"onions"    => ["french fried onions",
						"green onions",
						"red onions",
						"yellow onions"],

		"oranges"	=> ["blood oranges",
						"mandarin oranges",
						"navel oranges"],

		"peas"	    => ["black-eyed peas",
						"black eyed peas",
						"chick peas",
						"split peas"],

		"pepper"	=> ["cayenne pepper"],

		"peppers"	=> ["bell peppers",
						"chili peppers",
						"jalapeno peppers"],

		"popcorn"	=> ["popcorn shrimp",
						"popcorn chicken"],

		"pork"		=> ["pork chops",
						"pork shoulder"],

		"potatoes"	=> ["baking potatoes",
						"mashed potatoes",
						"sweet potatoes"],

		"powder"	=> ["chili powder",
						"curry powder",
						"garlic powder"],

		"rice"      => ["jasmine rice",
						"basmati rice",
						"brown rice"],

		"sauce"		=> ["barbecue sauce",
						"bbq sauce",
						"oyster sauce",
						"pasta sauce",
						"plum sauce",
						"soy sauce",
						"sweet and sour sauce",
						"tomato sauce"],

		"sprouts"	=> ["alfalfa sprouts",
						"brussels sprouts",
						"bean sprouts"],

		"sugar"		=> ["brown sugar",
						"icing sugar",
						"powdered sugar"],

		"tea"		=> ["black tea",
						"green tea",
						"iced tea",
						"jasmine tea",
						"orange pekoe tea"]
	}

	# the following list has been adapted from http://www.enchantedlearning.com/wordlist/food.shtml

	giant_food_list = [ "alfalfa",
					    "almonds",
						"anchovies",
						"anise",
						"apricots",
						"artichoke",
						"asparagus",
						"aspic",
						"avocado",

						"bagels",
						"bamboo shoots",
						"bananas",
						"barley",
						"basil",
						"bean curd",
						"beets",
						"biscuits",
						"blackberries",
						"blueberries",
						"boysenberries",
						"bran",
						"bread",
						"brisket",
						"broccoli",
						"brownies",
						"buckwheat",
						"buns",

						"candy",
						"cantaloupe",
						"capers",
						"caramel",
						"carrots",
						"cashews",
						"cassava",
						"cauliflower",
						"caviar",
						"celery",
						"cereal",
						"chard",
						"cheesecake",
						"cherries",
						"chickpeas",
						"chili",
						"chives",
						"chocolates",
						"chutney",
						"cilantro",
						"cinnamon",
						"clam",
						"clams",
						"cloves",
						"coca-cola",
						"coconut",
						"cod",
						"coffee",
						"coleslaw",
						"collard greens",
						"cookies",
						"corn",
						"cornflakes",
						"cornmeal",
						"crab",
						"crackers",
						"cream",
						"cucumbers",
						"cupcakes",
						"curds",
						"currants",
						"custard",

						"daikon",
						"dandelion greens",
						"dates",
						"dill",
						"donuts",
						"donut",
						"doughnuts",
						"dragonfruit",
						"dressing",
						"durian",

						"eggs",
						"eggplant",
						"elderberries",
						"endives",

						"figs",
						"flax",
						"flour",
						"french fries",
						"fritters",
						"frosting",

						"garlic",
						"gelatin",
						"ginger",
						"gingerale",
						"gingerbread",
						"gouda",
						"granola",
						"grapes",
						"grapefruit",
						"gravy",
						"guacamole",
						"guava",

						"haddock",
						"halibut",
						"ham",
						"hamburger",
						"hazelnuts",
						"honey",
						"honeydew",
						"horseradish",
						"hot dog",
						"hot sauce",
						"hummus",

						"ice cream",

						"jackfruit",
						"jalapeno",
						"jam",
						"jelly",
						"jellybeans",
						"jicama",

						"kale",
						"kebabs",
						"ketchup",
						"kiwi",
						"kohlrabi",
						"kool-aid",
						"kumquat",

						"lamb",
						"lard",
						"lasagna",
						"lemons",
						"lemonade",
						"lentils",
						"lettuce",
						"licorice",
						"limes",
						"liver",
						"lobster",
						"lollipops",
						"lox",
						"lunch meat",
						"lychee",

						"macaroni",
						"macaroons",
						"mangoes",
						"maple syrup",
						"margarine",
						"marmalade",
						"mayonnaise",
						"meatball",
						"meatballs",
						"meatloaf",
						"melon",
						"melons",
						"meringue",
						"milk",
						"mint",
						"mints",
						"molasses",
						"mozzarella",
						"muffins",
						"mushrooms",
						"mussels",
						"mustard",
						
						"naan",
						"nectarines",
						"noodles",
						"nuts",
						"nutmeg",

						"oats",
						"oatmeal",
						"oil",
						"okra",
						"olives",
						"onions",
						"oranges",
						"oregano",
						"oysters",

						"pancake mix",
						"paneer",
						"papaya",
						"parsley",
						"parsnip",
						"pasta",
						"pastries",
						"peaches",
						"peanuts",
						"peanut butter",
						"peas",
						"pears",
						"pecans",
						"penne",
						"pepper",
						"peppers",
						"pepperoni",
						"pepsi",
						"persimmons",
						"pickles",
						"pie",
						"pineapple",
						"pineapples",
						"pita",
						"plums",
						"pomegranates",
						"popsicles",
						"pork",
						"potatoes",
						"pretzels",
						"prime rib",
						"prunes",
						"pudding",
						"pumpernickel",
						"pumpkin",
						"punch",

						"quiche",
						"quinoa",

						"radishes",
						"raisins",
						"raspberries",
						"ravioli",
						"relish",
						"rhubarb",
						"ribs",
						"rice",
						"rolls",
						"romaine",
						"rosemary",
						"rye",

						"saffron",
						"sage",
						"salad",
						"salami",
						"salmon",
						"salsa",
						"salt",
						"sauerkraut",
						"sausage",
						"sausages",
						"scallops",
						"seaweed",
						"seeds",
						"sesame",
						"shallots",
						"sherbet",
						"shrimp",
						"slaw",
						"soda",
						"sole",
						"sorbet",
						"soup",
						"soy",
						"spaghetti",
						"spaghettini",
						"spareribs",
						"spinach",
						"sprinkles",
						"sprouts",
						"squash",
						"squid",
						"steak",
						"strawberries",
						"strudel",
						"sugar",
						"sunflower seeds",

						"taco",
						"tamales",
						"tangerine",
						"tapioca",
						"taro",
						"tarragon",
						"tea",
						"teriyaki",
						"thyme",
						"tilapia",
						"toffee",
						"tofu",
						"tomatoes",
						"tortilla",
						"tuna",
						"turkey",
						"turmeric",
						"turnip",

						"vanilla",
						"veal",
						"venison",
						"vinegar",

						"wafers",
						"waffles",
						"walnuts",
						"wasabi",
						"water chestnuts",
						"watercress",
						"watermelon",
						"whey",
						"weiners",
						"wieners",

						"yam",
						"yeast",
						"yogurt",

						"zucchini"
					  ]

	compound_word_list.each do | word, list | 

		unless (string =~ / #{word}[ ,]/i).nil?
			for compound_word in list
				unless (string =~ / #{compound_word}[ ,]/i).nil?
					string = string.gsub(/ #{compound_word}[ ,]/i, " <a class='button' href='#' onclick='event.preventDefault();'>" + compound_word.capitalize + "</a> ")
					break
				end
			end
		end
		unless (string =~ / #{word}[ ,]/i).nil?
			string = string.gsub(/ #{word}[ ,]/i, " <a class='button' href='#' onclick='event.preventDefault();'>" + word.capitalize + "</a> ")
		end
	end

	for word in giant_food_list

		unless (string =~ / #{word}[ ,]/i).nil?
			string = string.gsub(/ #{word}[ ,]/i, " <a class='button' href='#' onclick='event.preventDefault();'>" + word.capitalize + "</a> ")
		end

	end

	string

end

def eliminate_tables(nok_array)
	tableless = []
	for item in nok_array
		# make a hash of <b> and <p> elements
		nicer_item = {}
		trs = item.search('tr')
		nicer_item[:label] = wrap_food_in_link(
								trs[0].text.gsub("\r\n", " ")
								)
		nicer_item[:description] = wrap_food_in_link(
									trs[1].text.gsub("\r\n", " ")
									)
		# append to tableless
		tableless << nicer_item
	end
	tableless
end

get '/' do

	# get NoFrills sale items
	scraper = Mechanize.new
	flyer = scraper.get("https://local.flyerservices.com/LCL/NOFR/en/text?storenumber=730&publicationid=2735f93f-a887-4fe6-9abe-bac6bcf808a6")

	# Flyer is in table format, and the sale items are in tables nested inside tables:
	@food = eliminate_tables(
		human_food_only(
			flyer.search("table table")
		)
	)

	erb :index
end