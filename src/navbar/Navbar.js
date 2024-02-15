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
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';


export default function Navbar() {

  const navigate = useNavigate()
  const [role, setRole] = useState()
  const [currentUser, setCurrentUser] = useState("")
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
  const getRole = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().role);
      setRole(docSnap.data().role)

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

  }

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      getRole()
    }
  }, [currentUser])
  const [openNavColor, setOpenNavColor] = useState(false);
  const handleLogOut = async () => {
    signOut(auth)
      .then(() => {
        toast.success("User logged out.");
        navigate('/sign-in')
      })
      .catch((error) => {
        toast.error("There is an error logging out.");
      });
  };

  return (
    <>
      <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand as={NavLink} to='/'>Teacher's Aid</MDBNavbarBrand>
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
          <MDBCollapse open={openNavColor} navbar>
            <MDBNavbarNav className='justify-content-center mb-2 mb-lg-0 '>
              <MDBNavbarItem>
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

              <MDBNavbarItem>
                {currentUser && currentUser.uid ? (
                  <>
                    <NavLink onClick={async () => handleLogOut()}
                      className='nav-link hover:bg-blue-400'
                      to='/sign-in'
                      style={{ color: 'white' }}>Sign Out </NavLink>
                    <NavLink className='nav-link hover:bg-blue-400' to='/sign-in' style={{ color: 'white' }}>Hello {currentUser.displayName} </NavLink>
                  </>
                ) : (
                  <>
                    <MDBNavbarItem>
                      <NavLink className='nav-link hover:bg-blue-400' to='/registration' style={{ color: 'white' }}>Register</NavLink>
                      <NavLink className='nav-link hover:bg-blue-400' to='/sign-in' style={{ color: 'white' }}>Sign in </NavLink>
                    </MDBNavbarItem>
                    
                    

                  </>
                )}

              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>


    </>
  );
}