import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ReservationForm.css";
import { fetchListingReservations, fetchUserReservations, createReservation } from "../../store/reservations";
import { getListing } from "../../store/listings";
import ReservationSuccess from './ReservationSuccess'
import LoginFormModal from "../LoginFormModal";
import 'react-day-picker/dist/style.css';
import { format, isAfter, isBefore, isValid, parse, differenceInDays } from 'date-fns';
import DayPickerWrapper from '../DayPickerWrapper';
import { toggleLogin, toggleReservationSuccess } from "../../store/ui";


const ReservationForm = ({ listingId, selectedRange, setSelectedRange, reservationRanges }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const listing = useSelector(getListing(listingId));
  const [numGuests, setNumGuests] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState();
  const showReservationSuccess = useSelector(state => state.ui.showReservationSuccess)
  const showLogin = useSelector(state => state.ui.showLogin)
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const calendarRef = useRef();
  const [days, setDays] = useState(0);



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

    if (selectedRange?.from && selectedRange?.to) {
      setDays(differenceInDays(selectedRange?.to, selectedRange?.from))
    }

 
  }, [selectedRange]);
  


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
    const date = parse(e.target.value, 'yyyy-MM-dd', new Date());

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
    setToValue(e.target.value);
    const date = parse(e.target.value, 'yyyy-MM-dd', new Date());

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
      setFromValue(format(range.from, 'yyyy-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'yyyy-MM-dd'));
    } else {
      setToValue('');
    }
    if (range?.from && range?.to) {
      const newDays = differenceInDays(range.to, range.from);
      setDays(newDays);
      setTotalCost(listing.nightlyPrice * newDays * 1.18);
      setShowCalendar(false); 


    }
  };

  return (
    <div className="reservation-form-wrapper">
      <div>${listing.nightlyPrice}</div>
      <div className="reservation-selections">
        <div className="reservation-date-inputs">
          <div className="form-start-date">
            <input
              className="date-input" 
              value={fromValue} 
              onChange={handleFromChange}
              onClick={() => {
                setShowCalendar(true);
              }}
              placeholder="Start Date"
            />
            </div>
          <div className="form-end-date">
            <input 
              className="date-input" 
              value={toValue} 
              onChange={handleToChange}
              onFocus={() => {
                setShowCalendar(true);
              }}
              placeholder="End Date"
              />
          </div>
          <div ref={calendarRef} style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, backgroundColor: "yellow" }}>
            {showCalendar && <DayPickerWrapper
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
              reservationRanges={reservationRanges}
              onSelect={handleRangeSelect}
              />}
          </div>
        </div>

        <select className="guests-dropdown" value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
          {Array.from({ length: listing.maxGuests }, (_, i) => (
            <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
            ))}
        </select>
      </div>

     
      <div className="book-button" onClick={handleBook}>Reserve</div>
      
      <div className="charge-text">You won't be charged yet</div>

      <div className="cost-breakdown">
        <div className="nights-fee">
          <div className="nights-text">${listing.nightlyPrice} 𝗑 {days} nights</div>
          <div className="nights-value">${listing.nightlyPrice * days}</div>
        </div>
        <div className="cleaning-fee">
          <div className="cleaning-text">Cleaning fee</div>
          <div className="cleaning-value">${listing.nightlyPrice * days * 0.08} </div>
        </div>
        <div className="service-fee">
          <div className="service-text">Airbnb service fee</div>
          <div className="service-value">${listing.nightlyPrice * days * 0.1} </div>
        </div>
      </div>
      <div className="reservation-total">Total before taxes: ${totalCost}</div>

      {errors && errors.map((error, index) => <p key={index}>{error}</p>)}


      

      
      {showLogin && <LoginFormModal onClose={() => dispatch(toggleLogin())} />}
      {showReservationSuccess && <ReservationSuccess onClose={() => dispatch(toggleReservationSuccess())} /> }
    </div>
   
  );
};

export default ReservationForm;





