import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Payment from "./pages/Payment/Payment";
import Transactions from "./pages/Transactions/Transactions";
import PaymentRequest from "./pages/PaymentRequest/PaymentRequest";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment-request" element={<Payment />} />
        <Route path="/payment-request/list" element={<PaymentRequest />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
