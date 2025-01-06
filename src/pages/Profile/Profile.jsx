import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import PersonalInformationCard from "../../components/Profile/PersonalInformationCard";
import AccountDetailCard from "../../components/Profile/AccountDetailCard";
import AccountInformationCard from "../../components/Profile/AccountInformationCard";
import { getUser, updateUser } from "../../apis/services/User";
import { disableAccount, getAccount } from "../../apis/services/Account";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

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

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        });
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
      [field]: originalValues[field],
    }));
  };

  const handleCloseAccount = async () => {
    setLoading(true);
    try {
      const response = await disableAccount();

      if (response.statusCode === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error closing account:", error);
    } finally {
      setShowModal(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-3">
        <Container>
          <Row className="mb-4 d-flex justify-content-center align-items-center">
            <Col className="d-flex align-items-center flex-column">
              <h1 className="text-primary">{userData.fullName}</h1>
              <p className="text-muted">
                Số dư khả dụng:{" "}
                <span className="fw-bold text-primary">
                  {formatCurrency(accountData.balance)}
                </span>
              </p>
            </Col>
          </Row>

          <AccountInformationCard accountNumber={accountData.accountNumber} />

          <AccountDetailCard email={userData.email} phone={userData.phone} />

          <PersonalInformationCard
            editing={editing}
            inputValues={inputValues}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            handleInputChange={handleInputChange}
            handleCancelClick={handleCancelClick}
          />

          <Row className="mt-5">
            <Col className="d-flex justify-content-center">
              <Button
                onClick={() => setShowModal(true)}
                className="px-5 py-2 text-light"
              >
                ĐÓNG TÀI KHOẢN
              </Button>
            </Col>
          </Row>
        </Container>
      </main>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đóng tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn đóng tài khoản không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={handleCloseAccount}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đóng tài khoản"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
