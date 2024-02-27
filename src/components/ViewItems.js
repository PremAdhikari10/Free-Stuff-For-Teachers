import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'
import { collection, getDocs, where, doc, deleteDoc } from 'firebase/firestore'
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./ViewItems.css";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const ViewItems = () => {

  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [itemCollection, setItemCollection] = useState([]);

  const navigate = useNavigate("/")
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
      getUseritems();
    }
    else {
      getItems();
    }
  }, [currentUser]);


  //userItems:
  const getUseritems = async () => {

    try {


      const querySnapshot = await getDocs(collection(db, 'items'), where('items.databaName==', currentUser.userRef))
      const userData = [];
      querySnapshot.forEach(doc => {
        userData.push(doc.data());
      });
      //console.log(userData)

    } catch (error) {
      toast.error("Error fetching user data:", error);
      navigate('/')
    }


  }



  //all items:
  const getItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const allItems = [];
      querySnapshot.forEach(doc => {
        allItems.push(doc.data());
      });
      // console.log(allItems);
      // Check the data being fetched
      setItemCollection(allItems);
    } catch (error) {
      toast.error("Error fetching user data:", error);
      navigate('/')
    }

  }

//delete items

const deleteItem =async(databaseName)=>{
  try{
    await deleteDoc(doc(db, 'items', databaseName));
     // After deletion, update the UI to reflect the changes
    setItemCollection(prevItems => prevItems.filter(item => item.databaseName !== databaseName));
    toast.success("Item deleted successfully");
  }catch(error){
      toast.error("Error deleting item:",error);
  }
}


  return (
    <div>
      <h4 className="mt-4 mb-5 text-center">
        <strong>View Items</strong>
      </h4>
     {itemCollection.map((items,index)=>(
        <MDBContainer fluid key={index}>
        <MDBRow className="justify-content-center mb-0">
          <MDBCol md="12" xl="10">
            <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    >
                      <MDBCardImage
                        src={items.imageURL}
                        fluid
                        className="w-100"
                      />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        ></div>
                      </a>
                    </MDBRipple>
                  </MDBCol>
                  <MDBCol md="6">
                    <h5>{items.itemName}</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                      <CiLocationOn style={{ fontSize: '1.5em' }} />
                      </div>
                      <span>{items.address}</span>
                    </div>
                    <div className="text-truncate mb-4 mb-md-0">
                      <span>Donor Name : </span>
                      <span> {items.donorName} </span>
                    </div>
                    <div className="text-truncate mb-4 mb-md-0">
                      <span>Category : </span>
                      <span className="text-primary"></span>
                      <span>{items.category}</span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">
                    Phone Number : {items.phoneNumber}
                    </p>
                  </MDBCol>
                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">
                        <MdOutlineProductionQuantityLimits />
                      </h4>
                      <span className="text-danger">
                        Quantity: {items.quantity}
                      </span>
                    </div>
                    <h6 className="text-success">Free Items</h6>
                    <div className="d-flex flex-column mt-4">
                      <MDBBtn color="primary" size="sm">
                        View Details
                      </MDBBtn>
                      { currentUser && currentUser.uid === items.userRef ? (
                        <>
                      <MDBBtn color="danger" size="sm" 
                      className="mt-2" 
                      onClick={() => deleteItem(items.databaseName)}>
                        Delete Item
                      </MDBBtn>
                      
                      <MDBBtn outline color="primary" size="sm" className="mt-2" >
                        Edit Item
                      </MDBBtn>
                     </>):(  <MDBBtn outline color="primary" size="sm" className="mt-2">
                        Add to Cart
                      </MDBBtn>)}
                     
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
     ))}

    </div>
  )
}
export default ViewItems;