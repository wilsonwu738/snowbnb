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





  private
  def reservation_params
    params.require(reservations).permit(:start_date, :end_date, :num_guests)
  end

end
