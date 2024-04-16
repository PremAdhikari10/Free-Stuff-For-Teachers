import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBBtn } from "mdb-react-ui-kit";
import "./ViewItems.css";
import { auth } from '../firebase'; // Assuming you've set up your Firebase configuration in a file named 'firebase.js' in the '../firebase' directory

// Initialize Firebase authentication


const ViewItemDetails = () => {
  const { databaseName } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latLng, setLatLng] = useState(null); // State to hold latitude and longitude
  const [role, setRole] = useState(null); 
  const [currentUser, setCurrentUser] = useState("");

  

  useEffect(() => {
    // Firebase Auth listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
        // Fetch data when component mounts
      } else {
        // User is signed out.
        setCurrentUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      getRole();
    }
  }, [currentUser]);



  const getRole = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().role);
      setRole(docSnap.data().role)

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

  }




  const handleGoBack = () => {
    navigate('/viewitems');
  };

  const handleAddToCart = () => {
    // Add your logic to add the item to the cart here
    toast.success('Item added to cart successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-item-details">
      <MDBContainer fluid className="my-5">
        <MDBRow>
          <MDBCol>
            <MDBBtn onClick={handleGoBack} color="primary" size="sm" className="go-back-button">Back to View Items</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard className="text-black">
              <div className="d-flex justify-content-center align-items-center">
                <MDBCardImage
                  src={item.imageURL}
                  alt={item.itemName}
                  className="item-image"
                />
              </div>
              <MDBCardBody>
                <div className="text-center">
                  <MDBCardTitle>{item.itemName}</MDBCardTitle>
                </div>
                <div>
                  <p>Category: {item.category}</p>
                  <p>Donor Name: {item.donorName}</p>
                  <p>
                    Address:{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'underline' }}
                    >
                      {item.address}
                    </a>
                  </p>
                  <p>Phone Number: {item.phoneNumber}</p>
                  <p>Description: {item.description}</p>
                  {/* Add more item details here */}
                </div>
               {role=="Teacher"?(
               <>
                <MDBBtn onClick={handleAddToCart} outline color="primary" size="sm" className="add-to-cart-button">Add to Cart</MDBBtn>
               
               </>
              ):
               (<>
                
                 </>)}

                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ViewItemDetails;
