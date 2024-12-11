import React from "react";
import Navbar from "../../components/Navbar";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

const InternalTransfer = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={6}>
            <div className="w-100 bg-light p-4 rounded d-flex flex-column justify-content-between align-items-center">
              <Row className="w-100 mb-5">
                <Col>
                  <div className="w-100 d-flex flex-column align-items-center text-center">
                    <div className="step-circle active">1</div>
                    <p className="mt-2">Vui lòng nhập thông tin Người nhận.</p>
                  </div>
                </Col>
                <Col>
                  <div className="w-100 d-flex flex-column align-items-center text-center">
                    <div className="step-circle">2</div>
                    <p className="mt-2">Xác nhận</p>
                  </div>
                </Col>
              </Row>

              <Row className="w-100">
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Nhập số tài khoản hoặc email"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Số tiền (VND)"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="1000" />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Mô tả"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>

                  <Form.Check
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label={`Lưu vào Danh sách Chuyển tiền`}
                    className="mb-3"
                  />

                  <Button
                    className="w-100 p-2 mt-3 text-light"
                    variant="primary"
                  >
                    <p className="p-1">Tiếp tục</p>
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InternalTransfer;
