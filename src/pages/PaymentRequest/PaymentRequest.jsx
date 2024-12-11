import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import RequestList from "../../components/PaymentRequest/RequestList";
import Completed from "../../components/PaymentRequest/CompletedList";
import { formatCurrency } from "../../utils/formatCurrency";
import PopUpNewDebtReminder from "../../components/PopUp/PopUpNewDebtReminder.jsx";
import "./PaymentRequest.css";

const PaymentRequest = () => {
  const [isRequestListVisible, setIsRequestListVisible] = useState(true);
  const [isCompletedListVisible, setIsCompletedListVisible] = useState(true);
  const [sortOptionRequestList, setSortOptionRequestList] =
    useState("Gần đây nhất");
  const [sortOptionCompletedList, setSortOptionCompletedList] =
    useState("Gần đây nhất");

  // State để thêm nhắc nợ vào danh sách
  const [debtReminders, setDebtReminders] = useState([
    {
      name: "Nguyen Minh Khoi",
      profilePic: "https://my.timo.vn/static/media/default_avatar.32a9a6f8.svg",
      amount: 10000,
      direction: "tới",
      date: "9/12/2024",
    },
    {
      name: "Nguyen Minh Khoi",
      profilePic: "https://my.timo.vn/static/media/default_avatar.32a9a6f8.svg",
      amount: 20000,
      direction: "từ",
      date: "9/12/2024",
    },
    {
      name: "Nguyen Minh Khoi",
      profilePic: "https://my.timo.vn/static/media/default_avatar.32a9a6f8.svg",
      amount: 10000,
      direction: "từ",
      date: "9/12/2024",
    },
  ]);

  // State để điều khiển PopUp nào sẽ được hiển thị
  const [showNewDebtReminder, setShowNewDebtReminder] = useState(false);
  // Hàm đóng PopUp
  const handleCloseNewDebtReminder = () => setShowNewDebtReminder(false);
  // Hàm mở PopUp tương ứng
  const handleShowNewDebtReminder = () => setShowNewDebtReminder(true);

  const completedList = [
    {
      name: "Nguyen Minh Khoi",
      profilePic: "https://my.timo.vn/static/media/default_avatar.32a9a6f8.svg",
      amount: 10000,
      direction: "tới",
      date: "9/12/2024",
    },
    {
      name: "Nguyen Minh Khoi",
      profilePic: "https://my.timo.vn/static/media/default_avatar.32a9a6f8.svg",
      amount: 20000,
      direction: "từ",
      date: "9/12/2024",
    },
    {
      name: "Nguyen Minh Khoi",
      profilePic: "https://my.timo.vn/static/media/default_avatar.32a9a6f8.svg",
      amount: 10000,
      direction: "từ",
      date: "9/12/2024",
    },
  ];

  const toggleRequestList = () => {
    setIsRequestListVisible(!isRequestListVisible);
  };

  const toggleCompletedList = () => {
    setIsCompletedListVisible(!isCompletedListVisible);
  };

  const handleSortRequestChange = (option) => {
    setSortOptionRequestList(option);
  };

  const handleSortCompletedChange = (option) => {
    setSortOptionCompletedList(option);
  };

  return (
    <>
      <Navbar />
      <main className="py-3">
        <Container>
          <Row className="justify-content-center text-primary mb-1 fs-4 fw-bold">
            Nhắc Nợ
          </Row>
          <div className="d-flex justify-content-center mb-4">
            <span className="me-2">Số dư khả dụng:</span>
            <span className="fw-bold">{formatCurrency(30000000)}</span>
          </div>

          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8} className="d-flex justify-content-center gap-4">
              <a
                href="#"
                className="d-flex align-items-center gap-1 text-decoration-none text-primary "
              >
                <i className="bi bi-currency-dollar"></i> Nhắc Nợ
              </a>
              <a
                href="#"
                className="d-flex align-items-center gap-1 text-decoration-none text-primary"
              >
                <i className="bi bi-receipt"></i> Thanh Toán Hóa Đơn
              </a>
            </Col>
          </Row>

          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8}>
              <Card className="shadow-sm p-3">
                <Row className="text-center">
                  <Col >
                    <p className="mb-0 text-muted">Số dư khả dụng</p>
                    <h5>{formatCurrency(30000000)}</h5>
                  </Col>
                  <Col>
                    <p className="mb-0 text-muted">Tổng tiền nhận</p>
                    <h5>{formatCurrency(10000)}</h5>
                  </Col>
                  <Col>
                    <p className="mb-0 text-muted">Tổng tiền trả</p>
                    <h5 className="text-danger">{formatCurrency(30000)}</h5>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8}>
              <div className="d-flex justify-content-end">
                <Button
                  variant="light"
                  className="w-auto shadow-sm py-2 text-primary"
                  onClick={handleShowNewDebtReminder}
                >
                  TẠO NHẮC NỢ MỚI
                </Button>
                <PopUpNewDebtReminder 
                  show={showNewDebtReminder} 
                  handleClose={handleCloseNewDebtReminder} 
                  debtReminders={debtReminders}
                  setDebtReminders={setDebtReminders}
                />
              </div>
            </Col>
          </Row>

          <RequestList
            requestList={debtReminders}
            sortOptionRequestList={sortOptionRequestList}
            toggleRequestList={toggleRequestList}
            isRequestListVisible={isRequestListVisible}
            handleSortRequestChange={handleSortRequestChange}
          />

          <Completed
            completedList={completedList}
            sortOptionCompletedList={sortOptionCompletedList}
            toggleCompletedList={toggleCompletedList}
            isCompletedListVisible={isCompletedListVisible}
            handleSortCompletedChange={handleSortCompletedChange}
          />
        </Container>
      </main>
    </>
  );
};

export default PaymentRequest;
