import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/Payment";
import Transactions from "./pages/Transactions/Transactions";
import TransferMoney from "./pages/TransferMoney/TransferMoney";
import InternalTransfer from "./pages/TransferMoney/InternalTransfer";
import ExternalTransfer from "./pages/TransferMoney/ExternalTransfer";
import PaymentRequest from "./pages/PaymentRequest/PaymentRequest";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-request" element={<Payment />} />
        <Route path="/payment-request/list" element={<PaymentRequest />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/payment-request/list" element={<PaymentRequest />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
        <Route path="/transfer-money/internal" element={<InternalTransfer />} />
        <Route path="/transfer-money/external" element={<ExternalTransfer />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
