json.extract! @reservation, :id, :listing_id, :start_date, :end_date, :num_guests, :total_cost
json.user @reservation.guest.username
json.listing @reservation.listing.title
json.listingPhotoUrl @reservation.listing.photos.map { |file| url_for(file) }
json.listingMaxGuests @reservation.listing.max_guests