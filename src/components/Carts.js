import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { toast } from "react-toastify";
import { useState } from 'react';
import './Carts.css'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    MDBCardText
} from "mdb-react-ui-kit";
const Carts = () => {

    const navigate = useNavigate("/")
    const [cartCollection, setcartCollection] = useState([])
    const [noItemsLeft, setNoItemsLeft] = useState(false);

    useEffect(() => {
        fetchCartItems();


    }, [])



    const fetchCartItems = async () => {

        try {
            const userEmail = await auth.currentUser.email;
            const querySnapshot = await getDocs(collection(db, userEmail));

            const cartItems = [];

            querySnapshot.forEach((doc) => {
                cartItems.push(doc.data());
            });
            setcartCollection(cartItems)
        } catch (error) {
            toast.error("Error fetching user data:", error);
            navigate('/')
        }

    }
    const deleteCartItem = async (item) => {
        const userEmail = await auth.currentUser.email;
        if (window.confirm("Are you sure you want to delete item from the cart?")) {
            try {
                await deleteDoc(doc(db, userEmail, item));
                //delete items from the storage:


                // After deletion, update the UI to reflect the changes
                setcartCollection(prevItems => prevItems.filter(cartItems => cartItems.itemName !== item));
                toast.success("Item removed from cart!!");
                if (cartCollection.length === 0) {

                }
            } catch (error) {
                toast.error("Error deleting item:", error);
            }
        }
    }

    const getTotalQuantity = () => {
        let totalQuantity = 0;
        cartCollection.forEach((item) => {
            totalQuantity += item.quantity;
        })
        return totalQuantity;
    }


    return (
        <>
            <h1 className="text-3xl text-center mt-6 font-bold "> Shopping Cart</h1>

            <section className="bg-white">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <MDBTypography tag="h3" className="fw-normal mb-0 text-black">

                                </MDBTypography>

                            </div>

                            {cartCollection.map((item, index) => (

                                <MDBCard className="rounded-3 mb-4" key={index}>
                                    <MDBCardBody className="p-4">
                                        <MDBRow className="justify-content-between align-items-center">
                                            <MDBCol md="2" lg="2" xl="2">
                                                <MDBCardImage className="rounded-3" fluid
                                                    src={item.image}
                                                    alt={item.itemName} />
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="3">
                                                <p className="lead fw-normal mb-2">{item.itemName}</p>
                                                <p>
                                                    <span className="text-muted">Catagory: </span>{item.category}{" "}

                                                </p>
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="2"
                                                className="d-flex align-items-center justify-content-around">
                                                <MDBBtn color="link" className="px-2">
                                                    <MDBIcon fas icon="minus" />
                                                </MDBBtn>

                                                <MDBInput min={0} defaultValue={1} type="number" size="sm" />

                                                <MDBBtn color="link" className="px-2">
                                                    <MDBIcon fas icon="plus" />
                                                </MDBBtn>
                                            </MDBCol>
                                            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                                <MDBTypography tag="h5" className="mb-0">
                                                    <span className="text-muted">Qty: </span>{item.quantity}
                                                </MDBTypography>
                                            </MDBCol>
                                            <MDBCol md="1" lg="1" xl="1" className="text-end" onClick={() => deleteCartItem(item.itemName)}>
                                                <a href="#!" className="text-danger">
                                                    <MDBIcon fas icon="trash text-danger" size="lg" />
                                                </a>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>))}
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBBtn className="ms-3" color="primary" block size="lg">
                                        Checkout
                                    </MDBBtn>
                                    <MDBCardText tag="a" href="/viewitems" className="text-body">
                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                        to shop
                                    </MDBCardText>
                                </MDBCardBody>

                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>


    );
}

export default Carts