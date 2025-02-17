import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAccount } from "../../apis/services/Account";
import { getTransferHistory } from "../../apis/services/Transaction";
import TransactionHistory from "../../components/TransactionHistory.jsx/TransactionHistory";
import Loading from "../../components/Loading/Loading";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNotifications } from "../../context/NotificationContext";

const Home = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [history, setHistory] = useState([]);
  const { notifications } = useNotifications();

  useEffect(() => {
    async function fetchAccountData() {
      try {
        const response = await getAccount();
        setAccount(response.data);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      }
    }

    async function fetchTransferHistory() {
      try {
        const response = await getTransferHistory();
        const sortedHistory = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setHistory(sortedHistory);
      } catch (error) {
        console.error("Failed to fetch transfer history:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAccountData();
    fetchTransferHistory();
  }, []);

  const handleCopyAccountNumber = () => {
    if (account?.accountNumber) {
      navigator.clipboard.writeText(account.accountNumber);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Row className="d-flex justify-content-center my-3">
            <Col xs={10} md={8} lg={6}>
              <Link to="/notification">
                <Button className="w-100" variant="orange">
                  <div className="d-flex justify-content-between p-2">
                    <div className="text-light">
                      <i className="bi bi-bell"></i>
                      <span className="m-2">
                        Lời nhắc của bạn <span>( {notifications.length} )</span>
                      </span>
                    </div>
                  </div>
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={8} lg={6}>
              <Row>
                <Col>
                  <Link to="/transfer-money">
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
              <Button
                className="w-100"
                variant="light"
                onClick={handleCopyAccountNumber}
              >
                <div className="d-flex justify-content-between align-items-center p-2">
                  {account ? (
                    <>
                      <div className="d-flex flex-column gap-2">
                        <p className="text-start">Tài khoản chính</p>
                        <div>
                          <i className="bi bi-bank"></i>
                          <span className="m-2">
                            Số tài khoản: {account.accountNumber}
                          </span>
                        </div>
                      </div>
                      <p className="text-primary fs-4">
                        {formatCurrency(account.balance)} VND
                      </p>
                    </>
                  ) : (
                    <p className="text-danger">
                      Không có dữ liệu cho tài khoản
                    </p>
                  )}
                </div>
              </Button>
            </Col>
          </Row>

          <TransactionHistory
            history={history}
            account={account}
            loading={loading}
          />

          <Row></Row>
        </Container>
      </main>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1050,
        }}
      >
        <Toast show={showToast} onClose={() => setShowToast(false)} autohide>
          <Toast.Body>Đã sao chép số tài khoản</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default Home;
