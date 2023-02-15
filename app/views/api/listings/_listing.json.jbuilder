json.extract! listing, :id, :title, :description, :lat, :long,
  :location, :nightly_price, :max_guests, :num_baths,
  :num_bedrooms, :num_beds

  #for aws
# json.photoUrl listing.photos.attached? ? url_for(listing.photos) : nil
json.photo_url listing.photos.map { |file| url_for(file) }

json.username listing.host.username