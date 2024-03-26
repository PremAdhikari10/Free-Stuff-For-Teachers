import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { toast } from "react-toastify";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
<<<<<<< Updated upstream
=======
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import "../navbar/Navbar.css";
import { HiOutlineUserCircle } from "react-icons/hi2";
import logo from "../assets/logo.png";
>>>>>>> Stashed changes

export default function Navbar() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState("")
  const [isShowProfile, setIsShowProfile] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
        console.log(user)

      } else {
        // User is signed out.
        setCurrentUser(null);
      }
    }, []);

    // Cleanup function
    return () => unsubscribe();
  }, [])
  const [openNavColor, setOpenNavColor] = useState(false);
  const handleLogOut = async () => {
    signOut(auth)
<<<<<<< Updated upstream
        .then(() => {
            toast.success("User logged out.");
            navigate('/sign-in')
        })
        .catch((error) => {
            toast.error("There is an error logging out.");
        });
};
=======
      .then(() => {
        toast.success("User logged out.");
        navigate('/sign-in');
        toggleDropDown();
      })
      .catch((error) => {
        toast.error("There is an error logging out.");
      });
  };
>>>>>>> Stashed changes

  const toggleDropDown = () => {
    setIsShowProfile(!isShowProfile); //to toggle between true and false
  }

  return (
    <div>
      <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand as={NavLink} to='/'>
            <img src={logo} alt='logo' className='logo'/>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColor(!openNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
<<<<<<< Updated upstream
          <MDBCollapse open={openNavColor} navbar>
            <MDBNavbarNav className='justify-content-center mb-2 mb-lg-0 '>
              <MDBNavbarItem>
                <NavLink className='nav-link hover:bg-blue-400' activeClassName='active' exact to='/' style={{ color: 'white' }}>Home</NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink className='nav-link hover:bg-blue-400' activeClassName='active' exact to='/viewitems' style={{ color: 'white' }}>View Items</NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink className='nav-link hover:bg-blue-400' activeClassName='active' exact to='/add_items' style={{ color: 'white' }}>Add Items</NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink className='nav-link hover:bg-blue-400' activeClassName='active' exact to='/maps' style={{ color: 'white' }}>📍Items Near Me</NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                {currentUser && currentUser.uid ? (
                  <>
                    <NavLink  onClick={async()=>handleLogOut()}
                    className='nav-link hover:bg-blue-400' 
                    activeClassName='active' exact to='/sign-in' 
                    style={{ color: 'white' }}>Sign Out </NavLink>
                    <NavLink className='nav-link hover:bg-blue-400' activeClassName='active' exact to='/sign-in' style={{ color: 'white' }}>Hello {currentUser.displayName} </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className='nav-link hover:bg-blue-400' activeClassName='active' exact to='/sign-in' style={{ color: 'white' }}>Sign in </NavLink>
                  </>
                )}
=======
          <MDBCollapse open={openNavColor} navbar style={{height: "auto"}}>
            <MDBNavbarNav className='justify-content-end mb-2 mb-lg-0 '>
              <MDBNavbarItem >
                <NavLink className='nav-link hover:bg-blue-400' to='/' style={{ color: 'white' }}>Home</NavLink>
              </MDBNavbarItem>

              {
                currentUser && currentUser.uid ? (
                  <>

                    <MDBNavbarItem>
                      <NavLink className='nav-link hover:bg-blue-400' to='/viewitems' style={{ color: 'white' }}>View Items</NavLink>
                    </MDBNavbarItem>
                    {
                      role === "Donor" ? (
                        <>
                          <MDBNavbarItem>
                            <NavLink className='nav-link hover:bg-blue-400' to='/add_items' style={{ color: 'white' }}>Add Items</NavLink>
                          </MDBNavbarItem>
                          <MDBNavbarItem>
                            <NavLink className='nav-link hover:bg-blue-400' to='/my_listings' style={{ color: 'white' }}>My Listings</NavLink>
                          </MDBNavbarItem>
                        </>
                      ) : (
                        <>

                        </>
                      )
                    }

                    <MDBNavbarItem>
                      <NavLink className='nav-link hover:bg-blue-400' to='/maps' style={{ color: 'white' }}>📍Items Near Me</NavLink>
                    </MDBNavbarItem>
                  </>
                ) : (
                  <>
                  </>
                )
              }

              {currentUser && currentUser.uid ? (
                  <div className='profile_info_wrapper'>
                    <MDBNavbarItem>
                      <HiOutlineUserCircle className='teacher_user-icon' onClick={toggleDropDown}/>
                    </MDBNavbarItem>
                    {
                      isShowProfile &&
                      <div className='profile_info'>
                        <NavLink className='nav-link hover:bg-blue-400' to='/' style={{ color: 'white' }}>Hello, {currentUser.displayName} </NavLink>
                        <NavLink
                          onClick={async () => handleLogOut()}
                          className='nav-link hover:bg-blue-400'
                          to='/sign-in'
                          style={{ color: 'white' }}
                        >
                        Sign Out
                        </NavLink>
                      </div>
                    }
                  </div>
                ) : (
                  <>
                    <NavLink className='nav-link hover:bg-blue-400' to='/registration' style={{ color: 'white' }}>Register</NavLink>
                    <NavLink className='nav-link hover:bg-blue-400' to='/sign-in' style={{ color: 'white' }}>Sign in </NavLink>
                  </>
                )
              }
>>>>>>> Stashed changes

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

<<<<<<< Updated upstream
    </>
=======
      {
        isShowProfile && 
        <div className='screen_wrapper' onClick={toggleDropDown}/>
      }
    </div>
>>>>>>> Stashed changes
  );
}