class Api::SessionsController < ApplicationController
  # before_action :required_logged_out, only: [:create]
  # before_action :required_logged_in, only: [:destroy]

  def show
    @user = current_user
    if @user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])
    @listing_ids = @user.reservations.pluck(:listing_id).uniq
  

    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials weer invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    
    logout!
    head :no_content # populate http response with no content => no body
    # render json: { message: 'success' }
  end
end
