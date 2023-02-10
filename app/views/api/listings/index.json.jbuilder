json.listings do   
  @listings.each do |listing|
    json.set! listing.id do
      json.partial! 'listing', listing: listing
    end
  
  end
end

