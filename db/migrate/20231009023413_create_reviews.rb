class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :listing, null: false, foreign_key: true
      t.text :content, null: false
      t.float :communication, null: false
      t.float :cleanliness, null: false
      t.float :accuracy, null: false
      t.float :location, null: false
      t.float :value, null: false
      t.float :check_in, null: false
      t.timestamps
    end
  end
end
