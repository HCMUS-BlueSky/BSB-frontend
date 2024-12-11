import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import TransferMoney from "./pages/TransferMoney/TransferMoney";
import InternalTransfer from "./pages/TransferMoney/InternalTransfer";
import ExternalTransfer from "./pages/TransferMoney/ExternalTransfer";
import PaymentRequest from "./pages/PaymentRequest/PaymentRequest";
import Signup from "./pages/Signup/Signup";
import TransferMoney from "./pages/TransferMoney/TransferMoney";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-request/list" element={<PaymentRequest />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
        <Route path="/transfer-money/internal" element={<InternalTransfer />} />
        <Route path="/transfer-money/external" element={<ExternalTransfer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
