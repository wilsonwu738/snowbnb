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
  validate :dates_valid?, :no_overlapping_reservations

  belongs_to :guest,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing


  private

  def dates_valid?
    if start_date.nil? || end_date.nil? || start_date >= end_date
      errors.add(:base, "Invalid selection of reservation dates")
    end
  end

  def no_overlapping_reservations
    # the first where excludes the current reservation, the second where picks up the overlapping reservation
    overlapping_reservations = Reservation.where.not(id: id).where(
      "user_id = :user_id AND NOT((start_date > :end_date) OR (end_date < :start_date))",
      user_id: user_id,
      start_date: start_date,
      end_date: end_date
    )

    errors.add(:base, "The dates conflict with your existing reservation.") if overlapping_reservations.exists?
  end


end
