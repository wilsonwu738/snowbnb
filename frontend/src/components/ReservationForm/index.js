import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import moment from "moment";
import "./ReservationForm.css";
import { fetchListingReservations, fetchUserReservations, createReservation } from "../../store/reservations";
import { getListing } from "../../store/listings";
import ReservationSuccess from './ReservationSuccess'
import LoginFormModal from "../LoginFormModal";
import 'react-day-picker/dist/style.css';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import DayPickerWrapper from '../DayPickerWrapper';


const ReservationForm = ({ listingId, selectedRange, setSelectedRange, reservedDates }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const listing = useSelector(getListing(listingId));
  const [numGuests, setNumGuests] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [errors, setErrors] = useState();
  const listingReservations = useSelector((state) => state.entities.reservations)

  const [showCalendar, setShowCalendar] = useState(false);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const calendarRef = useRef();


  useEffect(() => {
    dispatch(fetchListingReservations(listingId))
  }, [dispatch, listingId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  

  const isDateBlocked = (day) => {
    const reservationsArray = Object.values(listingReservations);
    return reservationsArray.some(
      (reservation) =>
        day.isSameOrAfter(moment(reservation.startDate), "day") &&
        day.isSameOrBefore(moment(reservation.endDate), "day")
    );
  };

  // const handleBook = async (e) => {
  //   e.preventDefault();
  //   setErrors([]);

  //   if (sessionUser) {
      // if(!startDate || !endDate) {
      //   setErrors(["Please select both a start and end date."]);
      //   return;
      // }
      // const res = await dispatch(createReservation({
      //   reservation: {
      //     startDate: startDate.format('YYYY-MM-DD'),
      //     endDate: endDate.format('YYYY-MM-DD'),
      //     listingId: listingId,
      //     numGuests: numGuests,
      //     totalCost: totalCost
      //   }
      // }))

      // if (!res.ok) {
      //   setErrors(res.errors)
      // } else {
      //   setShowSuccess(true)
      // }
    
  //   }
  //   else setShowLogin(true)
  // };
  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      setFromValue('');
      setToValue('');
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: date, to: undefined });
      setToValue('');
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
  };
  

  const handleToChange = (e) => {
    console.log('HI')
    setToValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      setFromValue('');
      setToValue('');
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: undefined });
      setFromValue(format(date, 'y-MM-dd'));
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
    if (range?.from && range?.to) {
      setShowCalendar(false); 
    }
  };

  return (
    // this section is using calendar library
    <div className="reservation-form-wrapper">
      {/* <DateRangePicker
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
      /> */}
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

    <div>
      <input 

        value={fromValue} 
        onChange={handleFromChange}
        onClick={() => {
          setShowCalendar(true);
        }}
        placeholder="Start Date"
      />
      {' | '}
      <input 
        value={toValue} 
        onChange={handleToChange}
        onFocus={() => {
          setShowCalendar(true);
        }}
        placeholder="End Date"
        />
      <div ref={calendarRef} style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, backgroundColor: "yellow" }}>

      {showCalendar && <DayPickerWrapper
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
        reservedDates={reservedDates}
        onSelect={handleRangeSelect}
        />}
      </div>
    </div>
    <button onClick={handleFromChange}>Test handleFromChange</button>

      <select value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
        {Array.from({ length: listing.maxGuests }, (_, i) => (
        <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
        ))}
      </select>
      <br />
      <button className="book-button">Reserve</button>
      
      <div>You won't be charged yet</div>

      {errors && errors.map((error, index) => <p key={index}>{error}</p>)}

      <p>TotalCost: $ {totalCost}</p>
      

      
      {showLogin && <LoginFormModal onClose={() => setShowLogin(false)} />}
      {showSuccess && <ReservationSuccess onClose={() => setShowSuccess(false)} /> }
    </div>
   
  );
};

export default ReservationForm;





