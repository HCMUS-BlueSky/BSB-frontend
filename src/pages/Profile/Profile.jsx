import React from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import Navbar from "../../components/Navbar";
import { useState } from "react";
import PersonalInformationCard from "../../components/Profile/PersonalInformationCard";
import AccountDetailCard from "../../components/Profile/AccountDetailCard";
import AccountInformationCard from "../../components/Profile/AccountInformationCard";

function Profile() {
  const handleProfilePicClick = () => {
    document.getElementById("profilePicInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // API image upload
    }
  };

  const [editing, setEditing] = useState({
    maritalStatus: false,
    currentAddress: false,
    occupation: false,
    title: false,
    taxCode: false,
  });

  const [inputValues, setInputValues] = useState({
    currentAddress: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP Hồ Chí Minh",
    occupation: "Giáo viên/giảng viên",
    title: "Giáo sư, tiến sĩ",
    taxCode: "1234567890",
    maritalStatus: "",
  });

  const [originalValues, setOriginalValues] = useState(inputValues);

  const handleEditClick = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    // Store original value when editing begins
    setOriginalValues((prev) => ({ ...prev, [field]: inputValues[field] }));
  };

  const handleSaveClick = (field) => {
    setEditing((prev) => ({ ...prev, [field]: false }));
    // API update
  };

  const handleMaritalStatusChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      maritalStatus: e.target.value,
    }));
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
          <Row className="mb-4 d-flex justify-content-end align-items-center">
            <Col className="d-flex align-items-end justify-content-end">
              <div
                onClick={handleProfilePicClick}
                className="mb-3"
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "inline-block",
                }}
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <input
                type="file"
                id="profilePicInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </Col>
            <Col className="d-flex align-items-start flex-column">
              <h1 className="text-primary">John Doe</h1>
              <p className="text-muted">
                Số dư khả dụng:{" "}
                <span className="fw-bold text-primary">30.000.000</span>
              </p>
            </Col>
          </Row>

          {/* Account Information */}
          <AccountInformationCard />

          {/* Account Details */}
          <AccountDetailCard />

          {/* Personal Information Card */}
          <PersonalInformationCard
            editing={editing}
            inputValues={inputValues}
            maritalStatus={inputValues.maritalStatus}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            handleInputChange={handleInputChange}
            handleMaritalStatusChange={handleMaritalStatusChange}
            handleCancelClick={handleCancelClick}
          />
        </Container>
      </main>
    </>
  );
}

export default Profile;
