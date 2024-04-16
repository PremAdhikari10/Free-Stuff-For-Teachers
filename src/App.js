import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ViewItems from './components/ViewItems';
import ItemsNearMe from './components/ItemsNearMe';
import AddItems from './components/AddItems';
import SignIn from './Login_SignUP/SignIn';
import Registration from './Login_SignUP/Registration';
import ForgotPassword from './Login_SignUP/ForgotPassword';
import ChangePassword from './Login_SignUP/ChangePassword';
import EditItems from './components/EditItems';
import MyListings from './components/MyListings';
import Carts from './components/Carts';
import Navbar from './navbar/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from './firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Unauthorized from './Login_SignUP/Unauthorized';
import ViewItemDetails from './components/ViewItemDetails'; // Import ViewItemDetails component

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null)


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
      // console.log("Document data:", docSnap.data().role);
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

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>

          {currentUser && currentUser.uid ? (
            <>
              <Route path='/viewitems' exact element={<ViewItems />} />
              
                     {
                        (role === 'Donor') ? (
                           <>
                  <Route path='/add_items' exact element={<AddItems />} />
                  <Route path='/edit-items/:databaseName' exact element={<EditItems />} />
                  <Route path='/my_listings' exact element={<MyListings />} />
                  <Route path='/carts' exact element={<Unauthorized />} />
                  <Route path='/view-details/:databaseName' exact element={<ViewItemDetails />} /> {/* Step 2: Add route for viewing item details */}
                </>
              ) : (
                <>
                  <Route path='/add_items' exact element={<Unauthorized />} />
                  <Route path='/edit-items/:databaseName' exact element={<Unauthorized/>} />
                  <Route path='/my_listings' exact element={<Unauthorized />} />
                  <Route path='/carts' exact element={<Carts />} />
                  <Route path='/view-details/:databaseName' exact element={<ViewItemDetails />} /> {/* Step 2: Add route for viewing item details */}
                </>
              )
                     }
                     <Route path='/maps' exact element={<ItemsNearMe />} />
                  </>
               ) : (
                  <>
                     <Route path='/viewitems' exact element={<SignIn />} />
                     <Route path='/add_items' exact element={<SignIn />} />
                     <Route path='/maps' exact element={<SignIn />} />
                     <Route path="/edit-items/:databaseName" exact element={<SignIn />}/>
                     <Route path='/my_listings' exact element={<SignIn />} />
                  </>
               )}

          
               <Route path='/' exact element={<Home />} />
          <Route path='/registration' exact element={<Registration />} />

          <Route path='/sign-in' exact element={<SignIn />} />
          <Route path='/forgot-password' exact element={<ForgotPassword />} />
          <Route path='/change-password' exact element={<ChangePassword />} />

        </Routes>

      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
