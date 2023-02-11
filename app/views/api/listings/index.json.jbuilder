
#maybe do not need .listings

  @listings.each do |listing|
    json.set! listing.id do
      json.partial! 'listing', listing: listing 
    end
  
  end
