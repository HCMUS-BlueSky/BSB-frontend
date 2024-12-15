import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAccount } from "../../apis/services/Account";

const Home = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function fetchAccountData() {
      const response = await getAccount();
      setAccount(response.data);
    }
    fetchAccountData();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Row className="d-flex justify-content-center my-3">
            <Col xs={10} md={8} lg={6}>
              <Button className="w-100" variant="orange">
                <div className="d-flex justify-content-between p-2">
                  <div className="text-light">
                    <i className="bi bi-bell"></i>
                    <span className="m-2">Lời nhắc của bạn</span>
                  </div>
                </div>
              </Button>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={8} lg={6}>
              <Row>
                <Col>
                  <Link to={"/transfer-money"}>
                    <Button className="w-100" variant="light">
                      <div className="d-flex justify-content-center p-2">
                        <div className="d-flex gap-2 text-primary text-uppercase">
                          <i className="bi bi-arrow-left-right"></i>
                          <p>Chuyển tiền</p>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to="/payment-request/list">
                    <Button className="w-100" variant="light">
                      <div className="d-flex justify-content-center p-2">
                        <div className="d-flex gap-2 text-primary text-uppercase">
                          <i className="bi bi-cash-coin"></i>
                          <p className="text-primary text-uppercase">Nhắc nợ</p>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={8} lg={6}>
              <Button className="w-100" variant="light">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="d-flex flex-column gap-2">
                    <p className="text-start">Tài khoản chính</p>
                    <div>
                      <i className="bi bi-bank"></i>
                      <span className="m-2">
                        Số tài khoản: {account?.accountNumber}
                      </span>
                    </div>
                  </div>
                  <p className="text-primary fs-4">{account?.balance} vnd</p>
                </div>
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
