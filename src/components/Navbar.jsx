import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-white sticky p-4">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col>
            {/* Add onClick event to navigate to the home page */}
            <img
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              src="/img/logo/logo.png"
              alt="BSB Logo"
              onClick={handleLogoClick}
            />
          </Col>

          <Col>
            <div className="d-flex justify-content-end">
              <div className="d-flex gap-2 align-items-center">
                <h6>{user?.fullName}</h6>
                <Image src="/img/profile/default.svg" roundedCircle />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
