import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../firebase';
import { getAuth } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
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

const MyListings = () => {
    const auth = getAuth()
    const [itemCollection, setItemCollection] = useState([]);
    const navigate = useNavigate("/");

    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);

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
        userListings();
        fetchCategories();
    }, [auth.currentUser.uid])

    const userListings = async () => {
        try {
            const listingRef = collection(db, 'items');
            const q = query(listingRef, where("userRef", "==", auth.currentUser.uid))
            const querySnap = await getDocs(q);
            let listings = [];

            querySnap.forEach((doc) => {
                listings.push(doc.data())
            })
            // console.log(listings)
            setItemCollection(listings)
        }
        catch (error) {
            toast.error("Error fetching user data:", error);
            navigate('/')
        }
    }


    const deleteItem = async (databaseName) => {
        if (window.confirm("Are you sure you want to delete the item?")) {
            try {
                await deleteDoc(doc(db, 'items', databaseName));
                //delete items from the storage:

                const storageRef = ref(storage, databaseName);
                await deleteObject(storageRef);
                // After deletion, update the UI to reflect the changes
                setItemCollection(prevItems => prevItems.filter(item => item.databaseName !== databaseName));
                toast.success("Item deleted successfully");
            } catch (error) {
                toast.error("Error deleting item:", error);
            }
        }
    }
    function onEdit(databaseName) {
        navigate(`/edit-items/${databaseName}`);
    }
    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const categoriesData = querySnapshot.docs.map((doc) => doc.data().name);
            setCategories(categoriesData);
        } catch (error) {
            toast.error('Error fetching categories:', error);
            navigate('/');
        }
    };
    return (

        <div><h4 className="mt-4 mb-5 text-center">
            <strong>My Listings</strong>
        </h4>
        <div className="mb-4">
        <label htmlFor="categoryFilter" className="form-label">
          Filter by Category:
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Writing Utensils">Writing Utensils</option>
          <option value="Furniture">Furniture</option>
          <option value="Cleaning Supplies">Cleaning Supplies</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      {itemCollection
        .filter((item) => !selectedCategory || item.category === selectedCategory)
        .map((item, index) => (
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
                            src={item.imageURL}
                            fluid
                            className="w-100"
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
                            ></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>
                      <MDBCol md="6">
                        <h5>{item.itemName}</h5>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <CiLocationOn style={{ fontSize: '1.5em' }} />
                          </div>
                          <span>{item.address}</span>
                        </div>
                        <div className="text-truncate mb-4 mb-md-0">
                          <span>Donor Name : </span>
                          <span> {item.donorName} </span>
                        </div>
                        <div className="text-truncate mb-4 mb-md-0">
                          <span>Category : </span>
                          <span className="text-primary"></span>
                          <span>{item.category}</span>
                        </div>
                        <p className="text-truncate mb-4 mb-md-0">
                          Phone Number : {item.phoneNumber}
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
                            Quantity: {item.quantity}
                          </span>
                        </div>
                        <h6 className="text-success">Free Items</h6>
                        <div className="d-flex flex-column mt-4">
                          <MDBBtn color="primary" size="sm">
                            View Details
                          </MDBBtn>
                          {currentUser && currentUser.uid === item.userRef ? (
                            <>
                              <MDBBtn
                                color="danger"
                                size="sm"
                                className="mt-2"
                                onClick={() => deleteItem(item.databaseName)}
                              >
                                Delete Item
                              </MDBBtn>
                              <MDBBtn
                                outline
                                color="primary"
                                size="sm"
                                className="mt-2"
                                onClick={()=>onEdit(item.databaseName)}
                              >
                                Edit Item
                              </MDBBtn>
                            </>
                          ) : (
                            <MDBBtn
                              outline
                              color="primary"
                              size="sm"
                              className="mt-2"
                            >
                              Add to Cart
                            </MDBBtn>
                          )}
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

export default MyListings