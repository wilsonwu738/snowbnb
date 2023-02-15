class AddTotalcostReservations < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :total_cost, :integer, null: false
  end
end
