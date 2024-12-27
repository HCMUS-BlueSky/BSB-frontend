import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import { getAccountDetails } from "../../apis/services/Employee";

const AccountDetails = () => {
  const { accountId } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await getAccountDetails(accountId);
        setAccountDetails(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccountDetails();
  }, [accountId]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (!accountDetails) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p>No account details found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Card>
          <Card.Header>
            <h3>Thông tin tài khoản</h3>
          </Card.Header>
          <Card.Body>
            <p>
              <strong>Số tài khoản:</strong>{" "}
              {accountDetails.accountNumber || "N/A"}
            </p>
            <p>
              <strong>Họ tên:</strong>{" "}
              {accountDetails.owner?.fullName || "Unknown"}
            </p>
            <p>
              <strong>Email:</strong> {accountDetails.owner?.email || "N/A"}
            </p>
            <p>
              <strong>Số điện thoại: </strong>
              {accountDetails.owner?.phone || "N/A"}
            </p>
            <p>
              <strong>Số dư: </strong>
              {accountDetails.balance?.toFixed(2) || "0.00"} VND
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AccountDetails;
