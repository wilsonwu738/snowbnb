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
import { format, isAfter, isBefore, isValid, parse, differenceInDays } from 'date-fns';
import DayPickerWrapper from '../DayPickerWrapper';
import { toggleLogin, toggleReservationSuccess } from "../../store/ui";


const ReservationForm = ({ listingId, selectedRange, setSelectedRange, reservedDates }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const listing = useSelector(getListing(listingId));
  const [numGuests, setNumGuests] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState();
  const listingReservations = useSelector((state) => state.entities.reservations)
  const showReservationSuccess = useSelector(state => state.ui.showReservationSuccess)
  const showLogin = useSelector(state => state.ui.showLogin)
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

  useEffect(() => {
    if (selectedRange?.from) {
      setFromValue(format(selectedRange.from, 'yyyy-MM-dd'));
    } else {
      setFromValue('');
    }
    
    if (selectedRange?.to) {
      setToValue(format(selectedRange.to, 'yyyy-MM-dd'));
    } else {
      setToValue('');
    }
  }, [selectedRange]);
  

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
      if(!selectedRange.from || !selectedRange.to) {
        setErrors(["Please select both a start and end date."]);
        return;
      }
      const res =  await dispatch(createReservation({
        reservation: {
          startDate: format(selectedRange.from, 'yyyy-MM-dd'),
          endDate: format(selectedRange.to, 'yyyy-MM-dd'),
          listingId: listingId,
          numGuests: numGuests,
          totalCost: totalCost
        }
      }))

      if (!res.ok) {
        setErrors(res.errors);
      } else {
        dispatch(toggleReservationSuccess());
      }
    
    }
    else dispatch(toggleLogin());
  };

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
      const days = differenceInDays(range.to, range.from);
      setTotalCost(listing.nightlyPrice * days);
    }
  };

  return (
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

      <select value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
        {Array.from({ length: listing.maxGuests }, (_, i) => (
        <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
        ))}
      </select>
      <br />
      <div className="book-button" onClick={handleBook}>Reserve</div>
      
      <div>You won't be charged yet</div>

      {errors && errors.map((error, index) => <p key={index}>{error}</p>)}

      <div>Total before taxes: ${totalCost}</div>

      

      
      {showLogin && <LoginFormModal onClose={() => dispatch(toggleLogin())} />}
      {showReservationSuccess && <ReservationSuccess onClose={() => dispatch(toggleReservationSuccess())} /> }
    </div>
   
  );
};

export default ReservationForm;





