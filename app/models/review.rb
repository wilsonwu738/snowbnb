# == Schema Information
#
# Table name: reviews
#
#  id            :bigint           not null, primary key
#  user_id       :bigint           not null
#  listing_id    :bigint           not null
#  content       :text             not null
#  communication :integer          not null
#  cleanliness   :integer          not null
#  accuracy      :integer          not null
#  location      :integer          not null
#  value         :integer          not null
#  check_in      :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Review < ApplicationRecord
  validates :user_id, :listing_id, presence: true
  validates :content, presence: true, length: { minimum: 5, maximum: 1000, message: "Too many characters entered, maximum allowed is 1000!"  }
  validates :communication, :cleanliness, :accuracy, :location, :value, :check_in,
    presence: true, inclusion: { in: 0..5 }


  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

end
