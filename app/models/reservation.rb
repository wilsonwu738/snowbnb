# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  listing_id :bigint           not null
#  start_date :datetime         not null
#  end_date   :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  num_guests :integer          not null
#

class Reservation < ApplicationRecord
  require 'date'
  validates :start_date, :end_date, :num_guests, presence: true
  validate :legit_dates?

  belongs_to :guest,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing


  def legit_dates?
    if end_date < start_date
      errors.add(:end_date, "end date must be after start date")
    end

    if start_date < Date.today || end_date < Date.today
      errors.add(:end_date, "reservation must be made for future date")
    end
  end

end
