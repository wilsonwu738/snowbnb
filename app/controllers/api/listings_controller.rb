class Api::ListingsController < ApplicationController
  def index
    @listings = Listing.all 

    if params[:location].present?
      @listings = @listings.where("location ILIKE ?", "%#{params[:location]}%")
    end
    render :index
  end

  def show 
    @listing = Listing.find(params[:id])
    render :show
  end

  private

  def listing_params
    params.require(:listing).permit(
      :title,
      :description,
      :lat,
      :long,
      :location,
      :nightly_price,
      :max_guests,
      :num_baths,
      :num_bedrooms,
      :num_beds,
    )

  end

end
