class CreateItemsTable < ActiveRecord::Migration
  def change
  	create_table :items do |t|
  		t.string :label
  		t.text :description
  		t.belongs_to :flyer
  		t.timestamps
  	end
  end
end
