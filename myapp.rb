require 'sinatra'
require 'mechanize'

set :server, 'webrick'

def eliminate_tables(nok_array)
	tableless = []
	for item in nok_array
		# make a hash of <b> and <p> elements
		nicer_item = {}
		trs = item.search('tr')


		nicer_item[:label] = trs[0].text.gsub("/r/n", " ")
		nicer_item[:description] = trs[1].text.gsub("\r\n", " ")

		# append to tableless
		tableless << nicer_item
	end
	tableless
end

get '/' do

	# get NoFrills sale items
	scraper = Mechanize.new

	flyer = scraper.get("https://local.flyerservices.com/LCL/NOFR/en/ba503194-bb79-49f1-b64a-e326e9c1fd12/Text?storeId=9c9351a1-1936-41cb-9335-b8888b2c598e&morePublications=false")

	# Flyer is in table format, and the sale items are in tables nested inside tables:
	@food = eliminate_tables(flyer.search("table table"))

	erb :index
end