import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import PopUpFindAccount from "../../components/PopUp/PopUpFindAccount";
import PopUpNewDebtReminder from "../../components/PopUp/PopUpNewDebtReminder";

const Payment = () => {
  // State để điều khiển PopUp nào sẽ được hiển thị
  const [showFindAccount, setShowFindAccount] = useState(false);
  const [showNewDebtReminder, setShowNewDebtReminder] = useState(false);

  // Hàm đóng PopUp
  const handleCloseFindAccount = () => setShowFindAccount(false);
  const handleCloseNewDebtReminder = () => setShowNewDebtReminder(false);

  // Hàm mở PopUp tương ứng
  const handleShowFindAccount = () => setShowFindAccount(true);
  const handleShowNewDebtReminder = () => setShowNewDebtReminder(true);

  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Row className="d-flex justify-content-center my-3">
            <Col xs={10} md={6}>
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
            <Col xs={10} md={6}>
              <Row>
                <Col>
                  <Button className="w-100" variant="light">
                    <div className="d-flex justify-content-center p-2">
                      <div className="d-flex gap-2 text-primary text-uppercase">
                        <i className="bi bi-arrow-left-right"></i>
                        <p>Chuyển tiền</p>
                      </div>
                    </div>
                  </Button>
                </Col>
                <Col>
                  <Button className="w-100" variant="light">
                    <div className="d-flex justify-content-center p-2">
                      <div className="d-flex gap-2 text-primary text-uppercase">
                        <i className="bi bi-cash-coin"></i>
                        <p className="text-primary text-uppercase">Nhắc nợ</p>
                      </div>
                    </div>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={6}>
              <Button className="w-100" variant="light">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="d-flex flex-column gap-2">
                    <p className="text-start">Tài khoản chính</p>
                    <div>
                      <i className="bi bi-bank"></i>
                      <span className="m-2">Số tài khoản: 902127855814</span>
                    </div>
                  </div>
                  <p className="text-primary fs-4">0 vnd</p>
                </div>
              </Button>
            </Col>
          </Row>

          {/* Nút tạo nhắc nợ mới 1 */}
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={6}>
              <Button variant="primary" onClick={handleShowFindAccount}>
                <div className="text-light fw-bold">TÌM TÀI KHOẢN</div>
              </Button>

              {/* Sử dụng PopUpFindAccount */}
              <PopUpFindAccount show={showFindAccount} handleClose={handleCloseFindAccount} />
            </Col>
          </Row>

          {/* Nút tạo nhắc nợ mới 2 */}
          <Row className="d-flex justify-content-center mb-3">
            <Col xs={10} md={6}>
              <Button variant="primary" onClick={handleShowNewDebtReminder}>
                <div className="text-light fw-bold">TẠO NHẮC NỢ MỚI</div>
              </Button>

              {/* Sử dụng PopUpNewDebtReminder */}
              <PopUpNewDebtReminder show={showNewDebtReminder} handleClose={handleCloseNewDebtReminder} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Payment;
