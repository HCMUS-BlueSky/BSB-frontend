import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const Navbar = () => {
  return (
    <div className="bg-white sticky p-4">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col>
            <img
              style={{ width: "50px", height: "50px" }}
              src="/img/logo/logo.png"
              alt="BSB Logo"
            />
          </Col>

          <Col>
            <div className="d-flex justify-content-end">
              <div className="d-flex gap-2 align-items-center">
                <h6>NGUYEN MINH KHOI</h6>
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
