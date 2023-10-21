class ChangeReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :rating, :float
  end
end
