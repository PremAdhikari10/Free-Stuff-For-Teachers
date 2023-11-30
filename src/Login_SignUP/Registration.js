import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';
import { Notifier } from '../components/pages/Notifier';


export default function Registration() {
  const[message, setMessage] = useState("")
  const[name, setName] = useState("")
 
  const handleClick = () => {
    setMessage("This is prem")
    setName("Wrong email")
  }
 
 
 
  return (
    <MDBContainer fluid>

    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registration</p>

            <div className="d-flex flex-row align-items-center mb-4 ">
              <MDBIcon fas icon="user me-3" size='lg'/>
              <MDBInput label=' First Name' id='form1' type='text' className='w-100'/>
            
            </div>
            <div className='notifier'>
            
         <Notifier message={name} setMessage={setName} />
            </div>

            <div className="d-flex flex-row align-items-center mb-4 ">
              <MDBIcon fas icon="user me-3" size='lg'/>
              <MDBInput label='Last Name' id='form1' type='text' className='w-100'/>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="envelope me-3" size='lg'/>
              <MDBInput label='Your Email' id='form2' type='email'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size='lg'/>
              <MDBInput label='Password' id='form3' type='password'/>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="key me-3" size='lg'/>
              <MDBInput label='Confirm Password' id='form4' type='password'/>
              
            </div>

            
            <div className='mb-4'>
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember Password' />
            </div>

            <MDBBtn className='mb-4' size='lg' onClick={handleClick} >Register</MDBBtn>
            <Notifier message={message} setMessage={setMessage} />
            <Link to='/sign-in'>
                Already have an account? Click here to  Sign In
             </Link>
            

          </MDBCol>

          <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <MDBCardImage src='https://assets.caseys.com/m/be496110a18bce96/original/Cash-Classrooms-Donate-Hero.jpg' fluid/>
          </MDBCol>

        </MDBRow>
      </MDBCardBody>
    </MDBCard>

  </MDBContainer>

  );
}