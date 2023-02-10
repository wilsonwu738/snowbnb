# == Schema Information
#
# Table name: listings
#
#  id            :bigint           not null, primary key
#  title         :string           not null
#  description   :text             not null
#  lat           :float            not null
#  long          :float            not null
#  location      :string           not null
#  nightly_price :integer          not null
#  max_guests    :integer          not null
#  num_bedrooms  :integer          not null
#  num_beds      :integer          not null
#  num_baths     :integer          not null
#  owner_id      :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Listing < ApplicationRecord
  validates :title, :description, :lat, :long, :location, :nightly_price, 
    :max_guests, :num_baths, :num_bedrooms, :num_beds, :owner_id, presence: true
  


  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User
  

end
