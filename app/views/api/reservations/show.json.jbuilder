json.extract! @reservation, :id, :listing_id, :start_date, :end_date, :num_guests, :total_cost
json.user @reservation.user.name
json.listing @reservation.listing.title
