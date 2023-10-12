class Api::ReviewsController < ApplicationController
  before_action :required_logged_in, only: [:create, :show, :update, :destroy]
  
  # .includes for N+1 issue

  def index
    @reviews = Review.where(listing_id: params[:listing_id]).includes(:user)
    
    render :index
  end

  def show
    @review = Review.find(params[:id]).includes(:user)
    render :show
  end

  def create
    # this will automatically set the user_id
    @review = current_user.reviews.new(review_params)

    # making sure the user had reservation in the past before
    unless current_user.review_allowed?(@review.listing_id)
      return render json: { errors: ["You can only provide review after your reservation on this listing"]}, status: :forbidden
    end

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
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
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
