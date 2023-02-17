class Api::ReservationsController < ApplicationController
  # before_action :require_logged_in, only: [:index, :show, :update, :destroy]

  def index
    # does this return an array?
    @reservations = current_user.reservations
    render :index
  end

  def show
    @reservation = Reservation.find(params[:id])
    render :show
  end

  def create
    @reservation = Reservation.new(reservation_params)
    
    @reservation.user_id = current_user.id
    
    
    if @reservation.save
      render json: {status: "success"}
    else
      render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # {
   # errors : [""]
  #}



  def update
    @reservation = Reservation.find(params[:id])
    if @reservation && @reservation.update(reservation_params)
      render :show
    else
      render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.delete
  end





  private
  def reservation_params
    params.require(:reservation).permit(:listing_id, :start_date, :end_date, :num_guests, :total_cost)
  end

end

