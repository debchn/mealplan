class ChangeContentsToUrl < ActiveRecord::Migration
  def change
  	rename_column :flyers, :contents, :url
  end
end
