import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import 'react-dates/initialize'
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "./ReservationForm.css";
import { fetchListingReservations, fetchUserReservations, createReservation } from "../../store/reservations";
import { getListing } from "../../store/listings";
import ReservationSuccess from './ReservationSuccess'
import LoginFormModal from "../LoginFormModal";


const ReservationForm = ({ listingId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const listing = useSelector(getListing(listingId));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  // const [reservations, setReservations] = useState([]);
  const [numGuests, setNumGuests] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [errors, setErrors] = useState();
  const listingReservations = useSelector((state) => state.reservations)

  useEffect(() => {
    dispatch(fetchListingReservations(listingId))
  }, [dispatch, listingId]);

  

  const isDateBlocked = (day) => {
    const reservationsArray = Object.values(listingReservations);
    return reservationsArray.some(
      (reservation) =>
        day.isSameOrAfter(moment(reservation.startDate), "day") &&
        day.isSameOrBefore(moment(reservation.endDate), "day")
    );
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (sessionUser) {
      if(!startDate || !endDate) {
        setErrors(["Please select both a start and end date."]);
        return;
      }
      const res = await dispatch(createReservation({
        reservation: {
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          listingId: listingId,
          numGuests: numGuests,
          totalCost: totalCost
        }
      }))

      if (!res.ok) {
        setErrors(res.errors)
      } else {
        setShowSuccess(true)
      }
    
    }
    else setShowLogin(true)
  };

  return (
    // this section is using calendar library
    <div className="reservation-form-wrapper">
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date"
        endDate={endDate}
        endDateId="end_date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
          //for day count calculation, 
          if(startDate && endDate) {
            const days = endDate.diff(startDate, 'days');
            setTotalCost(listing.nightlyPrice * days);
          }
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        numberOfMonths={2}
        isDayBlocked={isDateBlocked}
        isOutsideRange={(day) => day.isBefore(moment(), "day")}
        // small={true}
        // noBorder={true}
        // hideKeyboardShortcutsPanel
      />


      <br />
      <br />
      {/* {startDate && endDate ? (
        <>
          <p>
            Selected from {startDate.format("MM/DD/YYYY")} to{" "}
            {endDate.format("MM/DD/YYYY")}
          </p>
          <p>{setTotalCost(listing.nightlyPrice * endDate.diff(startDate, 'days'))}</p>

        </>
      ) : (
        <p className="date-error">Please select the first and last day of your stay.</p>
      )} */}
      <br />
      <select value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
        {Array.from({ length: listing.maxGuests }, (_, i) => (
        <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
        ))}
      </select>
      <br />
      <button className="book-button" onClick={handleBook}>Reserve</button>
      
      <div>You won't be charge yet</div>

      {errors && errors.map((error, index) => <p key={index}>{error}</p>)}

      <p>TotalCost: $ {totalCost}</p>
      

      
      {showLogin && <LoginFormModal onClose={() => setShowLogin(false)} />}
      {showSuccess && <ReservationSuccess onClose={() => setShowSuccess(false)} /> }
    </div>
   
  );
};

export default ReservationForm;





