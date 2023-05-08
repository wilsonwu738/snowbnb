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
  const curListing = useSelector(getListing(listingId));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    dispatch(fetchReservations(listingId));
  }, []);

  const isDateBlocked = (day) => {
    return reservations.some(
      (reservation) =>
        day.isSameOrAfter(moment(reservation.start_date), "day") &&
        day.isSameOrBefore(moment(reservation.end_date), "day")
    );
  };

  const handleBook = () => {
    // Handle booking logic here
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
          <button className="book_button" onClick={handleBook}>Book</button>
        </>
      ) : (
        <p>Please select the first and last day of your stay.</p>
      )}
    </div>
  );
};

export default ReservationForm;



  // return (
  //     <div className="form-container">
  //         <form className="reservation-form" onSubmit={handleSubmit}>
  //           <ul>
  //             {errors.map(error => <li key={error}>{error}</li>)}
  //           </ul>
  //           {/* <div className="date-input">
  //             <input type="text" placeholder="CHECK-IN" 
  //               onClick={() => setShowCalendar(!showCalendar)}
  //               value={startDate}/>
  //             <input type="text" placeholder="CHECKOUT" 
  //               onClick={() => setShowCalendar(!showCalendar)}
  //               value={endDate}/>
  //           </div> */}
  //             {showCalendar && (
  //               <DateRangePicker
  //               ranges={[dateRange]}
  //               onChange={(item) => setDateRange(item.selection)}
  //               months={2}
  //               direction="horizontal"
  //               />
  //             )}

  //           <label>
  //             Number of Guests: 
  //             <input className='guest-input' type="number" 
  //             value={numGuests}
  //             onChange= {(e) => setNumGuests(e.target.value)}
  //             />
  //           </label>

  //           {/* <label>
  //             Total Cost: 
  //             <input type="text" 
  //             value={totalCost}
  //             onChange= {(e) => setTotalCost(e.target.value)}
  //             />
  //           </label> */}


  //           <div className="reservation-button">

  //             <button type="submit">Reserve</button>
  //           </div>
  //           <br />
  //           <div>
  //             Total before taxes $0
  //           </div>
  //         </form>
  //     </div>
          
  // );



