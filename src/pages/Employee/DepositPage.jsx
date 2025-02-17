import React, { useState } from "react";
import { Container, Card, Form, Button, Modal, Alert } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { deposit } from "../../apis/services/Employee";
import { getUserInfo } from "../../apis/services/Account";

const DepositPage = () => {
  const [accountIdentifier, setAccountIdentifier] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [account, setAccount] = useState(null);

  const handleAccountChange = (e) => setAccountIdentifier(e.target.value);

  const handleAmountChange = (e) => setAmount(e.target.value);

  const fetchAccountDetails = async (identifier) => {
    try {
      const response = await getUserInfo(identifier);
      setAccount({ name: response.data.fullName, status: "success" });
    } catch (error) {
      setAccount({ name: "Không tìm thấy tài khoản", status: "error" });
      console.error("Error fetching account details:", error);
    }
  };

  const handleDeposit = async () => {
    if (!accountIdentifier || !amount || isNaN(amount) || Number(amount) <= 0) {
      setErrorMessage("Vui lòng nhập thông tin hợp lệ.");
      return;
    }

    try {
      const response = await deposit(accountIdentifier, Number(amount));

      setSuccessMessage(`Đã nạp thành công số tiền ${amount} vào tài khoản.`);
      setErrorMessage("");
      setAmount("");
      setAccountIdentifier("");
      setShowModal(false);
    } catch (error) {
      console.error("Error during deposit:", error);
      setErrorMessage("Đã xảy ra lỗi khi thực hiện giao dịch.");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <Card>
          <Card.Header>
            <h3>Nạp tiền vào tài khoản</h3>
          </Card.Header>
          <Card.Body>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nhập số tài khoản hoặc email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập số tài khoản hoặc email"
                  value={accountIdentifier}
                  onChange={handleAccountChange}
                  onBlur={() => {
                    if (accountIdentifier.trim()) {
                      fetchAccountDetails(accountIdentifier);
                    } else {
                      setAccount(null);
                    }
                  }}
                />
                {account && (
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color:
                        account.status === "success" ? "#6c757d" : "#dc3545",
                      fontWeight: 400,
                      paddingTop: "10px",
                    }}
                  >
                    {account.name}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số tiền cần nạp</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập số tiền cần nạp"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="text-light"
              >
                Nạp tiền
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận nạp tiền</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Bạn có chắc chắn muốn nạp số tiền <strong>{amount || "0"}</strong>{" "}
              vào tài khoản{" "}
              <strong>{account?.name || accountIdentifier || "N/A"}</strong>{" "}
              không?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleDeposit}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default DepositPage;
