import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: credential, password: password }))
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
  };

  const demoLogin = () => {
    dispatch(sessionActions.login({credential: "demo@user.io", password: "password"}))
  }

  return (
    <div className="login-container">
      <div>
        <img className='snowman-img' src="https://snowbnb-seeds.s3.amazonaws.com/snowman.jpg" alt="" />
      </div>
      <br />
      <h2 className="welcome-text">Welcome back!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className="input_wrapper">
          <label >
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
    
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </label>
        </div>


        <div className="loginform-buttons">
          <button className="login-button" type="submit">Log In</button>
          <button className="demo-button" onClick={demoLogin}>Demo User</button>
        </div>

      </form>
    </div>
  );
}

export default LoginForm;