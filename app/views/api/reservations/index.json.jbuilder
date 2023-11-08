@reservations.each do |reservation|
  json.set! reservation.id do
    json.extract! reservation,
      :id,
      :user_id,
      :listing_id,
      :num_guests,
      :start_date,
      :end_date,
      :total_cost
    json.listingPhotoUrl reservation.listing.photos.map { |file| url_for(file) }
    json.listingMaxGuests reservation.listing.max_guests
    json.listing reservation.listing.title
  end

end
