class Api::ReservationsController < ApplicationController
  # before_action :require_logged_in, only: [:index, :show, :update, :destroy]

  def index
    # does this return an array? yes
    @reservations = current_user.reservations.order(start_date: :desc)
    render :index
  end

  def show
    @reservation = current_user.reservations.find(params[:id])
    render :show
  end

  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.user_id = current_user.id

    if @reservation.save
      render :show
      # render json: { status: 'success', message: 'Reservation created.' }, status: 201
    else
      render json: { errors: @reservation.errors.full_messages }, status: 400
    end

  end



  def update
    @reservation = current_user.reservations.find(params[:id])

    if @reservation.update(reservation_params)
      render :show
      # render json: { status: 'success', message: 'Reservation updated.' }, status: 200
    else
      render json: { errors: @reservation.errors.full_messages }, status: 400
    end

 
  end

  def destroy
    @reservation = current_user.reservations.find(params[:id])
    # @reservation.delete
    if @reservation.destroy
      render json: { message: 'success' }, status: 200
    else
      render json: { errors: ['Failed to delete reservation'] }, status: 400
    end
  end





  private
  def reservation_params
    params.require(:reservation).permit(:listing_id, :start_date, :end_date, :num_guests, :total_cost)
  end

end

