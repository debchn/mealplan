require 'sinatra'
require 'mechanize'

set :server, 'webrick'

def human_food_only(groceries)
	not_human_food = ["Detergent", "Soap", "Shower", "Shampoo", "Conditioner", "Dishwashing", "Toilet", "Toothpaste", "Toothbrush", "Hair Care", "Cat Food", "Dog Food", "Garbage", "Pampers", "Diapers"]
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

def wrap_words_in_span(string)
	spanned_string = ""

	for word in string.split
		spanned_string += "<span>" + word + "</span> "
	end

	spanned_string
end

def eliminate_tables(nok_array)
	tableless = []
	for item in nok_array
		# make a hash of <b> and <p> elements
		nicer_item = {}
		trs = item.search('tr')
		nicer_item[:label] = wrap_words_in_span(trs[0].text)
		nicer_item[:description] = trs[1].text
		# append to tableless
		tableless << nicer_item
	end
	tableless
end

get '/' do

	# get NoFrills sale items
	scraper = Mechanize.new
	flyer = scraper.get("https://local.flyerservices.com/LCL/NOFR/en/928559e2-87bc-4280-8f02-1acf1f798fde/Text?morePublications=false")

	# Flyer is in table format, and the sale items are in tables nested inside tables:
	@food = eliminate_tables(
		human_food_only(
			flyer.search("table table")
		)
	)

	erb :index
end