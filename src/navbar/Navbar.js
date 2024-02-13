import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

export default function Navbar() {
  const [openNavColor, setOpenNavColor] = useState(false);

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
          <NavLink className='nav-link hover:bg-blue-400' activeClassName='active' exact to='/sign-in' style={{ color: 'white' }}>Sign in</NavLink>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBContainer>
</MDBNavbar>

    </>
  );
}