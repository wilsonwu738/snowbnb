json.extract! @review, 
      :id, 
      :content,
      :communication,
      :cleanliness,
      :accuracy,
      :location,
      :value,
      :check_in,
      :user_id,
      :listing_id

json.reviewerName @review.user.username
json.reviewDate @review.created_at