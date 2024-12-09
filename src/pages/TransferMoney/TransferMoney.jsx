import React from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const TransferMoney = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={6}>
            <div className="w-100 bg-light p-2 rounded">
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
                      className="d-flex flex-column align-items-center"
                      variant="light"
                    >
                      <i className="bi bi-bank text-primary fs-5"></i>
                      <span className="m-2">Tài khoản ngân hàng khác</span>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TransferMoney;
