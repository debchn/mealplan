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

	flyer = scraper.get("https://local.flyerservices.com/LCL/NOFR/en/text?storenumber=730&publicationid=fbe32cdc-1ccf-4883-9e52-93fd5316cea4")

	# Flyer is in table format, and the sale items are in tables nested inside tables:
	@food = eliminate_tables(flyer.search("table table"))

	erb :index
end