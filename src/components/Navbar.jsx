import React, { useState } from "react";
import { Col, Container, Image, Row, Dropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuClick = (action) => {
    switch (action) {
      case "profile":
        navigate("/profile");
        break;
      case "changePassword":
        navigate("/change-password");
        break;
      case "logout":
        // Add your logout logic here
        console.log("User logged out");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white sticky p-4">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col>
            <img
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              src="/img/logo/logo.png"
              alt="BSB Logo"
              onClick={handleLogoClick}
            />
          </Col>

          <Col>
            <div className="d-flex justify-content-end">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="d-flex align-items-center gap-2 bg-transparent border-0 text-dark"
                >
                  <h6 className="m-0">{user?.fullName || "Guest"}</h6>
                  <Image
                    src="/img/profile/default.svg"
                    roundedCircle
                    style={{ width: "35px", height: "35px" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="m-lg">
                  <Dropdown.Item
                    className="p-lg"
                    onClick={() => handleMenuClick("profile")}
                  >
                    Thông tin tài khoản
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="p-lg"
                    onClick={() => handleMenuClick("changePassword")}
                  >
                    Đổi mật khẩu
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="p-lg"
                    onClick={() => handleMenuClick("logout")}
                  >
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
