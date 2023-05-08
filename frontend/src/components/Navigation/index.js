
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './logo.jpeg'
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../SearchBar';


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

      <div className='search-bar'>
        <SearchBar />
      </div>

      <div className='lin-git'>
        <a className="lin" href="https://www.linkedin.com/in/wilsonwu738"><i className="fa-brands fa-linkedin"></i></a>
        <a className="git" href="https://github.com/wilsonwu738"><i className="fa-brands fa-github"></i></a>
        <ProfileButton user={sessionUser}/>
      </div>


      
      
    </div>


      
    
  );
}

export default Navigation;