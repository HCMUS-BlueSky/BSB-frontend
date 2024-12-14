import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/Payment";
import Transactions from "./pages/Transactions/Transactions";
import TransferMoney from "./pages/TransferMoney/TransferMoney";
import InternalTransfer from "./pages/TransferMoney/InternalTransfer";
import ExternalTransfer from "./pages/TransferMoney/ExternalTransfer";
import PaymentRequest from "./pages/PaymentRequest/PaymentRequest";
import Profile from "./pages/Profile/Profile";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/payment-request" element={<Payment />} />
        <Route path="/payment-request/list" element={<PaymentRequest />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
        <Route path="/transfer-money/internal" element={<InternalTransfer />} />
        <Route path="/transfer-money/external" element={<ExternalTransfer />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
