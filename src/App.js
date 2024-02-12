import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import ViewItems from './components/pages/ViewItems';
import ItemsNearMe from './components/pages/ItemsNearMe';
import AddItems from './components/pages/AddItems';
import SignIn from './Login_SignUP/SignIn';
import Registration from './Login_SignUP/Registration';
import ForgotPassword from './Login_SignUP/ForgotPassword';
import Navbar from './navbar/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
   const [currentUser, setCurrentUser] = useState(true);
   useEffect(() => {
      //current user && current uid 
            
   })

   return (
      <div>
         <Router>
            <Navbar />
            <Routes>

               {currentUser ? (
                  <>
                     <Route path='/' exact element={<Home />} />
                  </>
               ) : (
                  <>
                     <Route path='/' exact element={<SignIn />} />
                  </>
               )}

               <Route path='/' exact element={<Home />} />
               <Route path='/registration' exact element={<Registration />} />
               <Route path='/viewitems' exact element={<ViewItems />} />
               <Route path='/add_items' exact element={<AddItems />} />
               <Route path='/maps' exact element={<ItemsNearMe />} />
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
