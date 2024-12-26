import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; 

const AccountInformationCard = ({accountNumber}) => {
  return (
    <Row className="d-flex justify-content-center">
      <Col xs={12} md={8}>
        <Card className="shadow-sm px-3">
          <div className="d-flex align-items-center justify-content-center py-3">
            <i className="bi bi-person-circle text-primary fs-3 me-2"></i>
            <h1 className="mb-0 fs-4">THÔNG TIN TÀI KHOẢN</h1>
          </div>

          {/* Account Number */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-bank2 me-2"></i>
              <p className="mb-0">
                <strong>Số tài khoản:</strong> {accountNumber}
              </p>
            </div>
          </Row>

          {/* Bank Name */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <Col className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-phone-fill me-2"></i>
                <p className="mb-0">
                  <strong>Tên ngân hàng:</strong> BSB Digital Bank by Blue Sky
                </p>
              </div>
              {/* <p className="mb-0">
                Mã SWIFT: <strong className="fw-bold">ABCXYZ</strong>
              </p> */}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default AccountInformationCard;
