import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Address from "./Components/Address";
import Checkout from "./Components/Checkout";
import'./App.css';
import'./Admin.css';
 
import Home from "./Components/Home";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import SignUp from "./Components/SignUp";
import Contactus from"./Components/Contactus";
import Aboutus from "./Components/Aboutus";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Components/Orders";
import Product from "./Components/Product";
import Header from "./Components/Header";
import HeaderM from "./Components/HeaderM";
import Card from "./Components/Card";
import Admin from './Components/Admin/Admin';
import AddProduct from "./Components/Admin/AddProduct";
import AdminSignup from "./Components/Admin/AdminSignup";
import HeaderA from "./Components/Admin/HeaderA";
import Navbar from "./Components/Navbar";
import Main from "./Components/Admin/Main";
import ManageProduct from "./Components/Admin/ManageProduct";
import AdminHeader from "./Components/Admin/AdminHeader";
import EditProduct from "./Components/Admin/EditProduct";
import Enquiry from "./Components/Admin/Enquiry";
import ProductDetails from "./Components/Productdetails";
import ProtectedRoute from "./Components/ProtectedRoute";
import Footer from "./Components/Footer";
import TandC from  "./Components/TandC";
import Privacypolicy from "./Components/Privecypolicy";
const promise = loadStripe(
  "pk_test_51KUDBXSE1AGsrDtwyXK8vcHYNkEOofJAP1vV1fRlpZNo93g4o80dZe4IvhAkBXo2ytDciCqqpynwQUXv7plCjezF00G9zyj4sc"
);

function App() {
return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/address" element={<Address />} />
          <Route path="/Contactus" element={<Contactus/>}/>
          <Route path="/Aboutus" element={<Aboutus/>}/>
          <Route path="/Header" element={<Header/>}/>
          <Route path="/HeaderM" element={<HeaderM/>}/>
         <Route path="/Footer" element={<Footer/>}/>
          <Route path = "/Card" element={<Card/>}/>
          <Route path ="/TandC" element={<TandC/>}/>
          <Route path ="/Privacypolicy" element={<Privacypolicy/>}/>
        
          
        
        <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
           <Route path="/Admin" element={<Admin/>}/>
          <Route path="/AdminSignup" element={<AdminSignup/>}/>
          <Route path="/HeaderA" element={<HeaderA/>}/>
         <Route
  path="/admin/Main"
  element={
    <ProtectedRoute>
      <Main />
    </ProtectedRoute>
  }
/>
          <Route path="/ManageProduct" element={<ManageProduct/>}/>
          <Route path="/AdminHeader" element={<AdminHeader/>}/>
           <Route path="/Enquiry" element={<Enquiry/>}/>
            <Route path="/Product/:id" element={<ProductDetails/>}/>
          <Route path="/addproduct" element={<AddProduct />} />
           <Route path="/EditProduct/:id" element={<EditProduct />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Container>
   </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
