class ReviewsController < ApplicationController
  def index
    @reviews = Review.where(listing_id: params[:listing_id])
    render :index
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id

    if @review.save
      render :show
    else
      # 422 is the code
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
    
  end

  def update
    @review = current_user.reviews.find(params[:id])

    if @review.update(review_params)
      render :show
    else
      render :json { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end

  end

  def destroy
    @review = current_user.reviews.find(params[:id])

    if @review.destroy
      render json: { message: " Success" }, status: :ok
    else
      render json: { errors: ["Failed to delete review, please try again"] }, status: :unprocessable_entity
    end
  end

  private
  def review_params
    params.require(:review).permit(
      :user_id, 
      :listing_id, 
      :content, 
      :communication, 
      :cleanliness, 
      :accuracy,
      :location,
      :value,
      :check_in)
  end

end
