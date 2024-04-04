import { auth, db } from '../firebase'
import { collection, doc, setDoc, updateDoc, deleteDoc, getDoc, increment, getDocs } from 'firebase/firestore'
import { toast } from "react-toastify";
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const AddToCart = async (item) => {

    const userEmail = await auth.currentUser.email;
    
   
    //if useremail ko database exist garxa bhane read from here otherwise return empty
    //if useremail database exist here then read from here otherwise return empty.
    const docRef = await doc(db, userEmail, item.itemName);
    const snapShot = await getDoc(docRef)
    if (snapShot.exists()) {
        await updateDoc(doc(db, userEmail, item.itemName), {
            quantity:increment(1)
        })
    }
    else {
        await setDoc(doc(db, userEmail, item.itemName), {
            itemName: item.itemName,
            category: item.category,
            donorName: item.donorName,
            address:item.address,
            image:item.imageURL,
            quantity: 1
        })
   
       
    }
    /*
    quantity from your main database ghatxa
    */
    toast.success("Item added to cart")
}

// export const removeCart = async(item)=> {
//     //if database ma tyo item xa bhane
//     /*
//     ani tyo item ko quantity chai == 1 xa bhane
//     call delete doc
//     else other subtract -1

//     */
// }

