import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'



const ReservationForm = (listingId) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndate] = useState(null);
  const [numGuests, setNumGuests] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
  //   e.preventDefault();
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
  };



  return (
      <div className="reservation-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>

        <DatePicker id="date" selected={startDate} 
          oncChange={(date) => setStartDate(date)} />
        
        <div className="reservation-buttons">

          <button type="submit">Reserve</button>
          <br />
          
        </div>
      </div>

  );
}

export default ReservationForm
