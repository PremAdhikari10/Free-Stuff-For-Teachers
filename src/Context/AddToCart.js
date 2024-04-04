import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../firebase.js"
import { setDoc, doc, getDoc, updateDoc, deleteField, getDocs, collection, deleteDoc } from 'firebase/firestore';


const CartContext = createContext();


export function useCart() {
  return useContext(CartContext);
}

// Modify the CartContext.js
export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    
    //check to see if there is data or initialize an empty array
    return cartItems || [];
  });
  //using addEffect feature to make sure that when 
  //user adds anything when logged in
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapShot = await getDocs(collection(db, user.email));
        const userData = await snapShot.docs.map((doc) => ({
          name: doc.data().name,
          price: doc.data().price,
          image: doc.data().image,
          quantity: doc.data().quantity,
          category: doc.data().category
        })
        );
        setCartItems(await userData);

        console.log("heeloWorld  ---", userData.name)
      }
    });
  }, []);

  const addToCart = (item) => {
    console.log(item, 'item')

    // Check if the item is already in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      // If the item is already in the cart, update its quantity
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.name === item.name) {
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docRef = await doc(db, user.email, item.name);
              await updateDoc(await docRef, {
                quantity: cartItem.quantity + 1
              })
              setCartItems(updatedCart);
            }
            else {
              console.log("User not logged in!")
              setCartItems(updatedCart);
              localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            }
          })
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });



    }
    else {
      onAuthStateChanged(auth, async (user) => {
        console.log("user", user);
        if (user) {
          try {
            const docRef = await doc(db, user.email, item.name)
            const snapShot = await getDoc(docRef)
            if (snapShot.exists()) {
              await updateDoc(docRef, {
                name: item.name,
                price: item.price,
                quantity: 1,  //for demo purpose
                image: item.image,
                category: item.category 
                /* items are stored by category, 
                so when cart items are fetched,
                 we need category to fetch additional info of added item 
                 */
              })
              console.log("test value")

            }
            else {
              await setDoc(doc(db, user.email, item.name), {
                name: item.name,
                price: item.price,
                quantity: 1,
                image: item.image,
                category: item.category
                 /* items are stored by category, 
                so when cart items are fetched,
                 we need category to fetch additional info of added item 
                 */
              })
            }

          }
          catch {

          }
        }
        else {
          console.log("User not logged in!")
          localStorage.setItem('cartItems', JSON.stringify([...cartItems, { ...item, quantity: 1 }]));
        }
      })
      console.log("khdafbskd")
      // If the item is not in the cart, add it with quantity 1
      // const updatedCart = setCartItems([...cartItems, { ...item, quantity: 1 }]);
      // setCartItems(updatedCart);
      const updatedCart = [...cartItems, {...item, quantity: 1 }];
       // localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      
    }


  };


  const removeFromCart = (itemName) => {
    const updatedCart = cartItems.reduce((accumulator, currentItem) => {
      if (currentItem.name === itemName) {
        if (currentItem.quantity > 1) {

          console.log("remove-", currentItem.quantity)
          accumulator.push({ ...currentItem, quantity: currentItem.quantity - 1 });
          onAuthStateChanged(auth, async (user) => {
            console.log("test1")
            if (user) {

              try {
                const docRef = await doc(db, user.email, currentItem.name)
                const snapShot = await getDoc(docRef)
                if (snapShot.exists()) {
                  await updateDoc(docRef, {
                    quantity: currentItem.quantity - 1
                  })


                }

              }
              catch {

              }
            }
            else {
              localStorage.setItem('cartItems', JSON.stringify(currentItem))
            }
          })

        }
        else if (currentItem.quantity === 1) {
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              //deleting the data whenever the price quantity gets less than 1
              // const docRef = await doc(db, user.email, currentItem.name);
              // const snapShot = await getDoc(docRef);
              // if (snapShot.exists()) {
              //   console.log("remove data from c")
              //   console.log("email", user.email)
              //   console.log("itemName", currentItem.name)
              //   await updateDoc(docRef, {
              //     name: deleteField(),
              //     price: deleteField(),
              //     quantity: deleteField(),
              //     image: deleteField()


              //   })
              //   console.log("remove data c")
              // }
              await deleteDoc(doc(db, user.email, currentItem.name))

            }
          })
        }

      } else {




        accumulator.push(currentItem);

      }
      return accumulator;
    }, []);

    onAuthStateChanged(auth, async (user)=> {
      if(user){
        setCartItems(updatedCart);
      }
      else {
        console.log("user not loggedin")
        // const updatedCart = [...cartItems, { ...itemName, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
    })
    
    // localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  const getTotalQuantity =()=> {
    let totalQuantity=0;
    cartItems.forEach((item)=> {
      totalQuantity += item.quantity;
    })
    return totalQuantity;
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
}