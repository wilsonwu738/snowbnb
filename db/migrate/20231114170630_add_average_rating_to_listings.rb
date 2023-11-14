class AddAverageRatingToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :average_rating, :float
  end
end
