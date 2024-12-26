import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import PersonalInformationCard from "../../components/Profile/PersonalInformationCard";
import AccountDetailCard from "../../components/Profile/AccountDetailCard";
import AccountInformationCard from "../../components/Profile/AccountInformationCard";
import { getUser,updateUser } from "../../apis/services/User"; 
import { getAccount } from "../../apis/services/Account"; 
import { formatCurrency } from "../../utils/formatCurrency"; 

function Profile() {
  const [editing, setEditing] = useState({
    address: false,
    dob: false,
  });

  const [inputValues, setInputValues] = useState({
    address: "",
    dob: "",
  });

  const [originalValues, setOriginalValues] = useState(inputValues);

  const [accountData, setAccountData] = useState({
    accountNumber: "",
    balance: "",
  });

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        const userData = response.data;
        setInputValues({
          address: userData.address || "",
          dob: userData.dob || "",
        });
        setUserData({
          fullName: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phone || "",
        })
        setOriginalValues({
          address: userData.address || "",
          dob: userData.dob || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAccountData = async () => {
      try {
        const response = await getAccount();
        const accountData = response.data;
        setAccountData({
          accountNumber: accountData.accountNumber || "",
          balance: accountData.balance || "",
        });
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccountData();

    fetchUserData();
  }, []);

  const handleEditClick = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    setOriginalValues((prev) => ({ ...prev, [field]: inputValues[field] }));
  };


  const handleSaveClick = async (field) => {
    try {
      const updateUserDto = { [field]: inputValues[field] };
      await updateUser(updateUserDto);
      setEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };
  

  const handleInputChange = (e, field) => {
    setInputValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancelClick = (field) => {
    setEditing((prev) => ({ ...prev, [field]: false }));
    setInputValues((prev) => ({
      ...prev,
      [field]: originalValues[field], // Reset to original value
    }));
  };

  return (
    <>
      <Navbar />
      <main className="py-3">
        <Container>
          {/* Profile Picture and Info */}
          <Row className="mb-4 d-flex justify-content-center align-items-center">
            <Col className="d-flex align-items-center flex-column">
              <h1 className="text-primary">{userData.fullName}</h1>
              <p className="text-muted">
                Số dư khả dụng:{" "}
                <span className="fw-bold text-primary">{formatCurrency(accountData.balance)}</span>
              </p>
            </Col>
          </Row>

          {/* Account Information */}
          <AccountInformationCard accountNumber={accountData.accountNumber} />

          {/* Account Details */}
          <AccountDetailCard email={userData.email} phone={userData.phone} />

          {/* Personal Information Card */}
          <PersonalInformationCard
            editing={editing}
            inputValues={inputValues}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            handleInputChange={handleInputChange}
            handleCancelClick={handleCancelClick}
          />
        </Container>
      </main>
    </>
  );
}

export default Profile;
