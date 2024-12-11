import React, { useState } from "react"; 
import Navbar from "../../components/Navbar";
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import "./TransferMoney.scss";

const TransferMoney = () => {
  const [showModal, setShowModal] = useState(false);
  const [showScreen1, setShowScreen1] = useState(true); // Manage modal screen state
  const [accountInfo, setAccountInfo] = useState(""); // Store account info
  const [showError, setShowError] = useState(false); // Error state

  const handleClose = () => {
    setShowModal(false);
    setShowScreen1(true); // Reset to screen 1 when closing modal
    setShowError(false); // Reset error state
    setAccountInfo("");
  };

  const handleShow = () => setShowModal(true);

  const handleSave = () => {
    if (!accountInfo.trim()) {
      setShowError(true); // Show error if account info is empty
      setShowScreen1(true); // Redirect to screen 1
    } else {
      setShowError(false); // Clear error state
      setShowModal(false); // Close modal
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-3">
        <Container>
          <Row className="justify-content-center text-primary mb-4 fs-4 fw-bold">
            Chuyển tiền
          </Row>
          <div className="d-flex justify-content-center mb-4">
            <span className="me-2">Số dư khả dụng:</span>
            <span className="fw-bold">{formatCurrency(30000000)}</span>
          </div>
        </Container>
        <Container className="bg-light p-4 rounded-3">
          <h5 className="mt-2">Bạn chuyển tiền qua kênh nào?</h5>
          <Row className="text-center mt-3">
            <Col>
              <Button variant="secondary" size="lg">
                <div className="d-flex flex-column align-items-center">
                  <span className="icon-placeholder">
                    <i className="bi bi-plus-circle-fill"></i>
                  </span>
                  <span className="color-light">Thành viên Timo</span>
                </div>
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" size="lg">
                <div className="d-flex flex-column align-items-center">
                  <span className="icon-placeholder">
                    <i className="bi bi-bank2"></i>
                  </span>
                  <span>Tài khoản ngân hàng khác</span>
                </div>
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className="d-flex justify-content-center p-5">
          <Button
            variant="primary"
            size="lg"
            className="w-10 text-white"
            onClick={handleShow}
          >
            THÊM NGƯỜI NHẬN MỚI
          </Button>

          <Modal show={showModal} onHide={handleClose} centered>
            {showScreen1 ? (
              // Screen 1
              <>
                <Modal.Header closeButton>
                  <Modal.Title>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center mb-4 fw-bold text-primary fs-4">Nhập thông tin tài khoản Timo</p>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="THÔNG TIN TÀI KHOẢN BSB"
                      className={`mb-4 ${showError ? "text-danger" : "Thông tin này không thể để trống"}`}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Nhập số tài khoản hoặc địa chỉ email"
                        value={accountInfo}
                        onChange={(e) => setAccountInfo(e.target.value)}
                        isInvalid={showError}
                      />
                    </FloatingLabel>
                    {showError && (
                      <small className="text-danger">Thông tin này không thể để trống</small>
                    )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    className="text-light"
                    onClick={() => setShowScreen1(false)}
                  >
                    TÌM NGƯỜI NHẬN
                  </Button>
                </Modal.Footer>
              </>
            ) : (
              // Screen 2
              <>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                <p className="text-center mb-4 fw-bold text-primary fs-4">Nhập thông tin tài khoản Timo</p>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="THÔNG TIN TÀI KHOẢN BSB"
                      className={`mb-4 ${showError ? "text-danger" : "Thông tin này không thể để trống"}`}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Nhập số tài khoản hoặc địa chỉ email"
                        value={accountInfo}
                        onChange={(e) => setAccountInfo(e.target.value)}
                        isInvalid={showError}
                      />
                    </FloatingLabel>
                    <small className="text-muted">Vo Thi Tam | BSB</small>
                    <FloatingLabel controlId="floatingInput" label="Tên gợi nhớ" className="mb-4 mt-4">
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên gợi nhớ"
                      />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="text-light"
                    variant="primary"
                    onClick={handleSave}
                  >
                    LƯU NGƯỜI NHẬN
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal>
        </Container>
        <Container className="bg-light p-4 rounded-3">
          <FloatingLabel
            controlId="floatingInput"
            label="Tìm kiếm"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Số tài khoản" />
          </FloatingLabel>
        </Container>
      </main>
    </>
  );
};

export default TransferMoney;
