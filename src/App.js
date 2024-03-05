import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './components/Home';
import ViewItems from './components/ViewItems';
import ItemsNearMe from './components/ItemsNearMe';
import AddItems from './components/AddItems';
import SignIn from './Login_SignUP/SignIn';
import Registration from './Login_SignUP/Registration';
import ForgotPassword from './Login_SignUP/ForgotPassword';
import Navbar from './navbar/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from './firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Unauthorized from './Login_SignUP/Unauthorized';


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
                           </>
                        ) : (
                           <>
                            <Route path='/add_items' exact element={<Unauthorized />} />
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
                  </>
               )}


               <Route path='/' exact element={<Home />} />
               <Route path='/registration' exact element={<Registration />} />

               <Route path='/sign-in' exact element={<SignIn />} />
               <Route path='/forgot-password' exact element={<ForgotPassword />} />

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