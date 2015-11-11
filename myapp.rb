require 'sinatra'
require 'sinatra/activerecord'
require './environments'
require 'capybara/poltergeist'
require 'phantomjs'

# activerecord models

class Flyer < ActiveRecord::Base
	has_many :items

	def self.fetch_and_save_url(session)

		session.visit "https://www.nofrills.ca/en_CA/flyers.accessibleview.banner@NOFR.storenum@730.week@current.html"
		iframe = session.find('#videoFrame')

		flyer = Flyer.create(:url => iframe[:src])

		return flyer
	end
end

class Item < ActiveRecord::Base
	belongs_to :flyer

	def self.fetch_and_save_items(session, flyer)
		
		session.visit flyer.url
		item_list = session.all('table table')
		
		for item in item_list

			trs = item.all('tr')

			label = trs[0].text.gsub("/r/n", " ")
			description = trs[1].text.gsub("\r\n", " ")

			Item.create(:label => label, :description => description, :flyer_id => flyer.id)
		end
	end
end

# Capybara session that grabs flyer and saves its url and items

def fetch_and_save_new_flyer

	# capybara / poltergeist setup

	Capybara.register_driver :poltergeist do |app|
	 	Capybara::Poltergeist::Driver.new(app, js_errors: false)
	end

	Capybara.default_driver = :poltergeist

	session = Capybara.current_session

	flyer = Flyer.fetch_and_save_url(session)
	Item.fetch_and_save_items(session, flyer)

end


get '/' do

	@food = Flyer.last.items

	erb :index
end

## instead: run Mechanize once a week and store that info in table
## get '/' do ==> @food = eliminate_tables(Flyer.last)