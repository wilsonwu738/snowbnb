
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './logo.jpeg'
import SignupFormModal from '../SignupFormModal';


function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  //benchbnb rendering profile button only when logged in
  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <div>
  //       <LoginFormModal />
  //       <SignupFormModal />
       
  //       {/* <NavLink to="/signup" className="login">Sign Up</NavLink> */}
  //     </div>
  //   );
  // }
  return (
    <div className='nav-bar'>
      <div>
        <NavLink exact to="/">
          <img className='logo' src={logo}></img>
        </NavLink>
      </div>
      {/* {sessionLinks} */}
      <div className='nav-button'>
        <ProfileButton user={sessionUser}/>
      </div>
    </div>


      
    
  );
}

export default Navigation;