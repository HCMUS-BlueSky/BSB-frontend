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
import Loading from "./components/Loading/Loading";
import ForgotPassword from "./pages/ResetPassword/ResetPassword";
import AccountList from "./pages/Employee/AccountList";
import AccountDetails from "./pages/Employee/AccountDetails";
import DepositPage from "./pages/Employee/DepositPage";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userHasAccess = allowedRoles.includes(user.role);

  if (!userHasAccess && user.role === "EMPLOYEE") {
    return <Navigate to="/employee" />;
  }

  return userHasAccess ? <Outlet /> : <Navigate to="/" />;
};

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route path="/reset-password" element={<ForgotPassword />} />

      <Route element={<RoleProtectedRoute allowedRoles={["CUSTOMER"]} />}>
        <Route path="/" element={<Home />} />
        <Route path="/payment-request" element={<Payment />} />
        <Route path="/payment-request/list" element={<PaymentRequest />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
        <Route path="/transfer-money/internal" element={<InternalTransfer />} />
        <Route path="/transfer-money/external" element={<ExternalTransfer />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<RoleProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
        <Route path="/employee" element={<AccountList />} />
        <Route path="/employee/deposit" element={<DepositPage />} />
        <Route
          path="/employee/account/:accountId"
          element={<AccountDetails />}
        />
      </Route>
    </Routes>
  );
};

export default App;
