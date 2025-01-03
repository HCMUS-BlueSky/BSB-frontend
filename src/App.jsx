import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import TransferMoney from "./pages/TransferMoney/TransferMoney";
import InternalTransfer from "./pages/TransferMoney/InternalTransfer";
import ExternalTransfer from "./pages/TransferMoney/ExternalTransfer";
import PaymentRequest from "./pages/PaymentRequest/PaymentRequest";
import Profile from "./pages/Profile/Profile";
import { useAuth } from "./context/AuthContext";
import Loading from "./components/Loading/Loading";
import AccountList from "./pages/Employee/AccountList";
import AccountDetails from "./pages/Employee/AccountDetails";
import DepositPage from "./pages/Employee/DepositPage";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import EmployeeList from "./pages/Admin/EmployeeList";
import Notification from "./pages/Notification/Notification";
import ResetPassword from "./pages/ResetPasssword/ResetPassword";

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

  if (!userHasAccess && user.role === "ADMIN") {
    return <Navigate to="/admin" />;
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

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<RoleProtectedRoute allowedRoles={["CUSTOMER"]} />}>
        <Route path="/" element={<Home />} />
        <Route path="/payment-request/list" element={<PaymentRequest />} />
        <Route path="/transfer-money" element={<TransferMoney />} />
        <Route path="/transfer-money/internal" element={<InternalTransfer />} />
        <Route path="/transfer-money/external" element={<ExternalTransfer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
      </Route>

      <Route element={<RoleProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
        <Route path="/employee" element={<AccountList />} />
        <Route path="/employee/deposit" element={<DepositPage />} />
        <Route
          path="/employee/account/:accountId"
          element={<AccountDetails />}
        />
      </Route>

      <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<EmployeeList />} />
      </Route>
    </Routes>
  );
};

export default App;
