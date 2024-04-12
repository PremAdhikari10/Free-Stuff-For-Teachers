import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'
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
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import "../navbar/Navbar.css";
import { HiOutlineUserCircle } from "react-icons/hi2";
import logo from "../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { get } from 'firebase/database';

export default function Navbar() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState("")
  const [cart, setCart] = useState(0)
  const [isShowProfile, setIsShowProfile] = useState(false);
  const [role, setRole] = useState()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);

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
      .then(() => {
        toast.success("User logged out.");
        navigate('/sign-in');
        toggleDropDown();
      })
      .catch((error) => {
        toast.error("There is an error logging out.");
      });
  };
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unsubscribeCartUpdates =getQuantity();
      getRole();
      return ()=>unsubscribeCartUpdates();
    }
  }, [currentUser])

 
  const getRole = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data().role);
      setRole(docSnap.data().role)

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

  }
  const getQuantity = () => {
    const cartName = 'cart' + currentUser.email;
    const cartRef = doc(db, cartName, "cartQuantity");
    return onSnapshot(cartRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCart(docSnapshot.data().cartQuantity);
      } else {
        setCart(0); // Set to default value if document doesn't exist
      }
    });
  }




  const toggleDropDown = () => {
    setIsShowProfile(!isShowProfile); //to toggle between true and false
  }

  return (
    <div>
      <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <NavLink to='/'>
              <img src={logo} alt='logo' className='logo' />
            </NavLink>
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
          <MDBCollapse open={openNavColor} navbar style={{ height: "auto" }}>
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
                    <MDBNavbarItem>
                      <NavLink className='nav-link hover:bg-blue-400' to='/maps' style={{ color: 'white' }}>📍Items Near Me</NavLink>
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
                          <MDBNavbarItem>
                            <NavLink className='nav-link hover:bg-blue-400 mr-6' to='/carts' style={{ color: 'white' }}>
                              <FaShoppingCart />
                              <span className='cart-count'>

                                {cart}
                              </span>

                            </NavLink>
                          </MDBNavbarItem>

                        </>
                      )
                    }


                  </>
                ) : (
                  <>

                  </>
                )
              }

              {currentUser && currentUser.uid ? (
                <div className='profile_info_wrapper'>
                  <MDBNavbarItem>
                    <HiOutlineUserCircle className='teacher_user-icon mr-3' onClick={toggleDropDown} />
                  </MDBNavbarItem>
                  {
                    isShowProfile &&
                    <div className='profile_info'>
                      <NavLink className='nav-link hover:bg-blue-400' to='/' style={{ color: 'white' }}>Hello, {currentUser.displayName} </NavLink>

                      <NavLink className='nav-link hover:bg-blue-400' to='/change-password' style={{ color: 'white' }}> Change Password </NavLink>

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

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      {
        isShowProfile &&
        <div className='screen_wrapper' onClick={toggleDropDown} />
      }
    </div>
  );
}
