@reviews.each do |review|
  json.set! review.id do
    json.extract! review, 
      :id, 
      :content,
      :communication,
      :cleanliness,
      :accuracy,
      :location,
      :value,
      :check_in,
      :user_id,
      :listing_id,
      :rating

    json.reviewerName review.user.first_name
    json.reviewDate review.created_at


  end

end