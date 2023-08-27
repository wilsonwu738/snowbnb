import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import 'react-dates/initialize'
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "./ReservationForm.css";
import { fetchReservations, createReservation } from "../../store/reservations";
import { getListing } from "../../store/listings";

const ReservationForm = ({ listingId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const listing = useSelector(getListing(listingId));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [numGuests, setNumGuests] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  

  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  const isDateBlocked = (day) => {
    return reservations.some(
      (reservation) =>
        day.isSameOrAfter(moment(reservation.start_date), "day") &&
        day.isSameOrBefore(moment(reservation.end_date), "day")
    );
  };

  const handleBook = () => {
    if (sessionUser) {
      dispatch(createReservation({
        reservation: {
          startDate: startDate,
          endDate: endDate,
          listingId: listingId,
          numGuests: numGuests,
          totalCost: totalCost
        }
      }
      ))
    }
  };

  return (
    <div>
      <h1>Calendar</h1>
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
      />
      {startDate && endDate ? (
        <>
          <p>
            Selected from {startDate.format("MM/DD/YYYY")} to{" "}
            {endDate.format("MM/DD/YYYY")}
          </p>
          <p>TotalCost: $ {totalCost}</p>
          {/* <p>{setTotalCost(listing.nightlyPrice * endDate.diff(startDate, 'days'))}</p> */}

          <button className="book_button" onClick={handleBook}>Book</button>
        </>
      ) : (
        <p>Please select the first and last day of your stay.</p>
      )}

      <p>Number of Guests</p>
      <select value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
        {Array.from({ length: listing.maxGuests }, (_, i) => (
        <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
        ))}
      </select>

   
    </div>
  );
};

export default ReservationForm;





