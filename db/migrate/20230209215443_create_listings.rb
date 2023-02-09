class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.float :lat, null: false
      t.float :long, null: false
      t.string :location, null: false
      t.integer :nightly_price, null: false
      t.integer :max_guests, null: false
      t.integer :num_bedrooms, null: false
      t.integer :num_beds, null: false
      t.integer :num_baths, null: false
      t.references :owner, null: false, foreign_key: { to_table: :users }


      t.timestamps
    end
  end
end
