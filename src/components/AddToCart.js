import { auth, db } from '../firebase'
import { collection, doc, setDoc, updateDoc, deleteDoc, getDoc, increment, getDocs } from 'firebase/firestore'
import { toast } from "react-toastify";

export const AddToCart = async (item) => {

    const userEmail = await auth.currentUser.email;
    const quantityRef = doc(db, "items", item.databaseName)
    const quantitySnapshot = await getDoc(quantityRef)
    const donorQuantity = await parseInt(quantitySnapshot.data().quantity);

    if (item && item.itemName) {
        const docRef = await doc(db, userEmail, item.itemName);

        const snapShot = await getDoc(docRef)
        const cartName = 'cart' + userEmail;
        const cartRef = doc(db, cartName, "cartQuantity")
        const cartSnapshot = await getDoc(cartRef)
        if (cartSnapshot.exists()) {
            
            if(donorQuantity>0){
                await updateDoc(doc(db, cartName, "cartQuantity"), {
                    cartQuantity: increment(1)
                })
            }
            
        }
        else {
            const cartName = 'cart' + userEmail;

            await setDoc(doc(db, cartName, "cartQuantity"), {
                cartQuantity:0
            })
        }

       
        if (quantitySnapshot.exists()) {
       
            if (donorQuantity !== 0) {
                if (snapShot.exists()) {
                    await updateDoc(doc(db, userEmail, item.itemName), {
                        quantity: increment(1)
                    })
                    await updateDoc(doc(db, "items", item.databaseName), {
                        quantity: donorQuantity - 1
                    })
                   // alert("Update1")
                 toast.success("Item added to cart")

                }

                else {
                    await setDoc(doc(db, userEmail, item.itemName), {
                        itemName: item.itemName,
                        category: item.category,
                        donorName: item.donorName,
                        address: item.address,
                        image: item.imageURL,
                        quantity: 1,
                        databaseName: item.databaseName

                    })
                    await updateDoc(doc(db, "items", item.databaseName), {
                        quantity: donorQuantity - 1
                    })

                    // alert("Update2") when item is selected first time
                    toast.success("Item added to cart");


                }

            }
            else {
                toast.error("Out of Stock")
            }
        }
        // your code here
    }


    /*
    quantity from your main database ghatxa
    */
    // toast.success("Item added to cart")
}
export const removeCart = async (item) => {
   
    const userEmail = await auth.currentUser.email;

    const quantityRef = doc(db, "items", item.databaseName);
    const quantitySnapshot = await getDoc(quantityRef);
    const donorQuantity = parseInt(quantitySnapshot.data().quantity);

    const docRef = doc(db, userEmail, item.itemName);
    const snapShot = await getDoc(docRef);

    if (snapShot.exists()) {
        // if it's the last item
        if (item.quantity === 1) {
            // delete this doc
            await deleteDoc(docRef);
            toast.success("Cart Item Deleted");
        } else {
            await updateDoc(docRef, {
                quantity: item.quantity - 1
            });
        }

        if(item.quantity>0){ 
            await updateDoc(doc(db, "items", item.databaseName), {
            quantity: donorQuantity + 1
        });}
        // Update donor quantity
        else{
            toast.error("Item Out Of Stock!!")
        }

        const cartName = 'cart' + userEmail;
        const cartRef = doc(db, cartName, "cartQuantity");
        const cartSnapshot = await getDoc(cartRef);

        if (cartSnapshot.exists()) {
            const cartValue = cartSnapshot.data().cartQuantity;
            await updateDoc(doc(db, cartName, "cartQuantity"), {
                cartQuantity: cartValue - 1
            });
        }

        toast.success("Item Removed from Cart");
    }

}



