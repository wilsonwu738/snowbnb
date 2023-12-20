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

  has_many_attached :photos
  


  belongs_to :host,
    foreign_key: :owner_id,
    class_name: :User

  has_many :reservations,
    foreign_key: :listing_id,
    class_name: :Reservation,
    dependent: :destroy

  has_many :reviews,
    foreign_key: :listing_id,
    class_name: :Review,
    dependent: :destroy
  
  def calculate_average_rating
    return 0 if reviews.empty?

    total_rating = reviews.sum { |review| review.rating }
    average_rating = total_rating.to_f / reviews.count
    update(average_rating: average_rating)
  end    

  # use this later for more interation with the map, make listings respond to the map selection
  def self.in_bounds(bounds)
    lower_lat, lower_lng, upper_lat, upper_lng = bounds
    where(lat: lower_lat..upper_lat, long: lower_lng..upper_lng)
  end

end
