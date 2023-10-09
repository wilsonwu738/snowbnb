class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :listing, null: false, foreign_key: true
      t.text :content, null: false
      t.integer :communication, null: false
      t.integer :cleanliness, null: false
      t.integer :accuracy, null: false
      t.integer :location, null: false
      t.integer :value, null: false
      t.integer :check_in, null: false
      t.timestamps
    end
  end
end
