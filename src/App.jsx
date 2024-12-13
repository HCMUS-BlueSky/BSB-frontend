import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/Payment";
import Transactions from "./pages/Transactions/Transactions";
<<<<<<< HEAD
=======
import TransferMoney from "./pages/TransferMoney/TransferMoney";
import InternalTransfer from "./pages/TransferMoney/InternalTransfer";
import ExternalTransfer from "./pages/TransferMoney/ExternalTransfer";
>>>>>>> 4c5f844e9d87a0ff9db7f5a841a16ad78353ecba
import PaymentRequest from "./pages/PaymentRequest/PaymentRequest";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
