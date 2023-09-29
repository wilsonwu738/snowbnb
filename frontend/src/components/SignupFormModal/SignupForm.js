import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

//onClose used to set showSignup to false 
function SignupFormPage({ onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .then(() => {
        onClose()})
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({credential: "demo@user.io", password: "password"}))
    .then(() => {
      onClose();
    })
  }

  return (
    <div className="signup-container">  
      <div>
        <img className='snowman2-img' src="https://snowbnb-seeds.s3.amazonaws.com/snowman2.jpg" alt="" />
      </div>
      <br />
      <h2 className="join-text">Hey you! Yes you! Come join us!</h2>
      <br />
      <form className="signup-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className="input-container">

          <div className="email-user">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            
            <br />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />

          </div>
          <div className="password-box">

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                />
     
            <br />
  
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                />
  
        </div>
        </div>
        <br />
        <div className="signup-buttons">

          <button className='signup-button' type="submit">Sign Up</button>
      
          <button className='demo-button' onClick={demoLogin}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;