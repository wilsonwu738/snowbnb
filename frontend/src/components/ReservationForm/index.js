import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './ReservationForm.css'
import { createReservation } from "../../store/reservations";
import { getListing } from "../../store/listings";



const ReservationForm = ({listingId}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const curListing = useSelector(getListing(listingId));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [numGuests, setNumGuests] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState([]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
   
  };

  const reservation = {reservation: {
    startDate,
    endDate, 
    listingId,
    numGuests: parseInt(numGuests),
    totalCost: parseInt(totalCost)
    }
  }

  // const costCal = () => {
  //   let dateDiff = endDate.getdate() - startDate.getdate()
  //   let cost = dateDiff * curListing.nightlyPrice
  //   setTotalCost[cost]
  //   return totalCost
  // }

  // if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(createReservation(reservation))
  //   if (password === confirmPassword) {
  //     setErrors([]);
  //     return dispatch(sessionActions.signup({ email, username, password }))
  //       .catch(async (res) => {
  //       let data;
  //       try {
  //         // .clone() essentially allows you to read the response body twice
  //         data = await res.clone().json();
  //       } catch {
  //         data = await res.text(); // Will hit this case if the server is down
  //       }
  //       if (data?.errors) setErrors(data.errors);
  //       else if (data) setErrors([data]);
  //       else setErrors([res.statusText]);
  //     });
  //   }
  //   return setErrors(['Confirm Password field must be the same as the Password field']);
  }



  return (
      <div className="form-container">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <div className="date-input">
              <input type="text" placeholder="CHECK-IN" 
                onClick={() => setShowCalendar(!showCalendar)}
                value={startDate}/>
              <input type="text" placeholder="CHECKOUT" 
                onClick={() => setShowCalendar(!showCalendar)}
                value={endDate}/>
            </div>
              {showCalendar && (
                <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                months={2}
                direction="horizontal"
                />
              )}

            <label>
              Number of Guests: 
              <input className='guest-input' type="number" 
              value={numGuests}
              onChange= {(e) => setNumGuests(e.target.value)}
              />
            </label>

            {/* <label>
              Total Cost: 
              <input type="text" 
              value={totalCost}
              onChange= {(e) => setTotalCost(e.target.value)}
              />
            </label> */}


            <div className="reservation-button">

              <button type="submit">Reserve</button>
            </div>
            <br />
            <div>
              Total before taxes $0
            </div>
          </form>
      </div>
          
  );
}

export default ReservationForm


