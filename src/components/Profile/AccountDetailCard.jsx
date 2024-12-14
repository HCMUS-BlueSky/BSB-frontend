import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const AccountDetailCard = () => {
  return (
    <Row className="d-flex justify-content-center mt-4">
      <Col xs={12} md={8}>
        <Card className="shadow-sm px-3">
          <div className="d-flex align-items-center justify-content-center py-3">
            <i className="bi bi-info-circle text-primary fs-3 me-2"></i>
            <h1 className="mb-0 fs-4">CHI TIẾT TÀI KHOẢN</h1>
          </div>

          {/* Username and Phone Number */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-person-fill me-2"></i>
              <p className="mb-0">
                <strong>Tên đăng nhập/Số điện thoại:</strong> 0912345678
              </p>
            </div>
          </Row>

          {/* Password */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-lock-fill me-2"></i>
                <p className="mb-0">
                  <strong>Mật khẩu:</strong> ******
                </p>
              </div>
              <div className=" ">
                <a
                  href="/reset-password"
                  variant="link"
                  className="text-primary d-flex "
                >
                  Chỉnh sửa
                  <i className="bi bi-pencil-fill ms-1"></i>
                </a>
              </div>
            </div>
          </Row>

          {/* Email Address */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope-fill  me-2"></i>
              <p className="mb-0">
                <strong>Địa chỉ email:</strong> johndoe@example.com
              </p>
            </div>
          </Row>

          {/* Phone Number */}
          <Row
            className="p-3 d-flex align-items-center"
            style={{ borderTop: "1px solid #f4f5f6" }}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-phone-fill  me-2"></i>
              <p className="mb-0">
                <strong>Số điện thoại:</strong> 0912345678
              </p>
            </div>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default AccountDetailCard;
