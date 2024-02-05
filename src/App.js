import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import ViewItems from './components/pages/ViewItems';
import ItemsNearMe from './components/pages/ItemsNearMe';
import AddItems from './components/pages/AddItems';
import SignIn from './Login_SignUP/SignIn';
import Registration from './Login_SignUP/Registration';
import Navbar from './navbar/Navbar';



function App() {
   return (
      <Router>
         <Navbar />
         <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/registration' exact element={<Registration />} />
            <Route path='/viewitems' exact element={<ViewItems />} />
            <Route path='/add_items' exact element={<AddItems />} />
            <Route path='/maps' exact element={<ItemsNearMe />} />
            <Route path='/sign-in' exact element={<SignIn />} />
         </Routes>

      </Router>
   );
}

export default App;
