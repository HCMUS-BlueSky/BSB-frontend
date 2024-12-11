import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TransferMoney.scss";

const TransferMoney = () => {
  const [showModal, setShowModal] = useState(false);
  const [showScreen1, setShowScreen1] = useState(true);
  const [accountInfo, setAccountInfo] = useState("");
  const [showError, setShowError] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setShowScreen1(true);
    setShowError(false);
    setAccountInfo("");
  };

  const handleShow = () => setShowModal(true);

  const handleSave = () => {
    if (!accountInfo.trim()) {
      setShowError(true);
      setShowScreen1(true);
    } else {
      setShowError(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={6}>
            <div className="w-100 bg-light p-2 rounded mb-3">
              <div className="p-2">
                <p>Bạn chuyển tiền qua kênh nào?</p>
              </div>
              <Row>
                <Col>
                  <Link to={"/transfer-money/internal"}>
                    <Button
                      className="w-100 d-flex flex-column align-items-center"
                      variant="light"
                    >
                      <i className="bi bi-moon-stars text-primary fs-5"></i>
                      <span className="m-2">Nội bộ BSB</span>
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to={"/transfer-money/external"}>
                    <Button
                      className="w-100 d-flex flex-column align-items-center"
                      variant="light"
                    >
                      <i className="bi bi-bank text-primary fs-5"></i>
                      <span className="m-2">Tài khoản ngân hàng khác</span>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="primary"
                className="w-4 text-white"
                onClick={handleShow}
              >
                THÊM NGƯỜI NHẬN MỚI
              </Button>
            </div>

            <FloatingLabel
              controlId="floatingInput"
              label="Tìm kiếm"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Số tài khoản" />
            </FloatingLabel>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        {showScreen1 ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100">
                <p className="w-100 text-center mb-4 fw-bold text-primary fs-4">
                  Nhập thông tin tài khoản BSB
                </p>
              </div>

              <FloatingLabel
                controlId="floatingInput"
                label="THÔNG TIN TÀI KHOẢN BSB"
                className={`mb-4 ${
                  showError ? "text-danger" : "Thông tin này không thể để trống"
                }`}
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
                <small className="text-danger">
                  Thông tin này không thể để trống
                </small>
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
          <>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <p className="w-100 text-center mb-4 fw-bold text-primary fs-4">
                Nhập thông tin tài khoản Timo
              </p>
              <FloatingLabel
                controlId="floatingInput"
                label="THÔNG TIN TÀI KHOẢN BSB"
                className={`mb-4 ${
                  showError ? "text-danger" : "Thông tin này không thể để trống"
                }`}
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
              <FloatingLabel
                controlId="floatingInput"
                label="Tên gợi nhớ"
                className="mb-4 mt-4"
              >
                <Form.Control type="text" placeholder="Nhập tên gợi nhớ" />
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
    </>
  );
};

export default TransferMoney;
