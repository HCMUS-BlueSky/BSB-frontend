import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TransferMoney.scss";
import { getUserByAccountNumber } from "../../apis/services/Account";
import { addReceiver, getReceiver } from "../../apis/services/Receiver";

const TransferMoney = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBSBAccountInfoScreen, setShowBSBAccountInfoScreen] =
    useState(true);
  const [accountInfo, setAccountInfo] = useState("");
  const [nickname, setNickname] = useState("");
  const [showError, setShowError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchAccountInfo, setSearchAccountInfo] = useState({});
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    async function getAccountList() {
      const res = await getReceiver();
      if (res.statusCode !== 200) {
        return;
      }
      setAccountList(res.data.receiverList);
    }
    getAccountList();
  }, []);

  useEffect(() => {
    console.log(accountList);
  }, [accountList]);

  // const accountList = [
  //   {
  //     id: 1,
  //     accountNumber: "123456",
  //     name: "Thanh Thien Nhan",
  //     status: "Chưa có thanh toán cho nơi nhận này",
  //     avatar: "https://via.placeholder.com/40",
  //   },
  //   {
  //     id: 2,
  //     accountNumber: "654321",
  //     name: "Vo Thi Tam",
  //     status: "Chưa có thanh toán cho nơi nhận này",
  //     avatar: "https://via.placeholder.com/40",
  //   },
  //   {
  //     id: 3,
  //     accountNumber: "112233",
  //     name: "Tran Quang",
  //     status: "Đã thanh toán một lần trước đó",
  //     avatar: "https://via.placeholder.com/40",
  //   },
  //   {
  //     id: 4,
  //     accountNumber: "445566",
  //     name: "Pham Minh",
  //     status: "Chưa có thanh toán cho nơi nhận này",
  //     avatar: "https://via.placeholder.com/40",
  //   },
  //   {
  //     id: 5,
  //     accountNumber: "778899",
  //     name: "Le Hoang Anh",
  //     status: "Đã thanh toán nhiều lần trước đó",
  //     avatar: "https://via.placeholder.com/40",
  //   },
  //   {
  //     id: 6,
  //     accountNumber: "998877",
  //     name: "Nguyen Thi Mai",
  //     status: "Chưa có thanh toán cho nơi nhận này",
  //     avatar: "https://via.placeholder.com/40",
  //   },
  //   {
  //     id: 7,
  //     accountNumber: "334455",
  //     name: "Dang Minh Tuan",
  //     status: "Chưa có thanh toán cho nơi nhận này",
  //     avatar: "https://via.placeholder.com/40",
  //   },
  // ];

  const handleClose = () => {
    setShowModal(false);
    setShowBSBAccountInfoScreen(true); // Renamed
    setShowError(false);
    setAccountInfo("");
  };

  const handleShow = () => setShowModal(true);

  const handleSave = async () => {
    const res = await addReceiver({
      accountNumber: accountInfo,
      nickname,
      type: "INTERNAL",
    });

    if (res.statusCode !== 200) {
      return;
    }

    handleClose();
  };

  const handleSearchAccount = async () => {
    const res = await getUserByAccountNumber(accountInfo);
    if (res.statusCode !== 200) {
      return;
    }
    setSearchAccountInfo(res.data);
    setShowBSBAccountInfoScreen(false);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={6}>
            <div className="w-100 bg-light p-2 rounded mb-3">
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
                      className="w-100 d-flex flex-column align-items-center"
                      variant="light"
                    >
                      <i className="bi bi-bank text-primary fs-5"></i>
                      <span className="m-2">Tài khoản ngân hàng khác</span>
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="primary"
                className="text-white"
                onClick={handleShow}
              >
                <i className="bi bi-person-plus me-2"></i> THÊM NGƯỜI NHẬN MỚI
              </Button>
            </div>

            <FloatingLabel
              controlId="floatingInput"
              label="Tìm kiếm"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Số tài khoản" />
            </FloatingLabel>
            <div className="receiver-list">
              {accountList?.map((account) => (
                <div
                  key={account.id}
                  className="d-flex align-items-center justify-content-between p-3 mb-2 bg-white rounded border"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-light d-flex justify-content-center align-items-center me-3"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <img
                        src="https://via.placeholder.com/40"
                        alt={account.name}
                        className="rounded-circle"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div>
                      <p className="mb-0 fw-bold">{account.nickname}</p>
                      {/* <p className="mb-0 text-muted">{account.status}</p> */}
                    </div>
                  </div>

                  <div>
                    <Button variant="light" className="me-2">
                      <i className="bi bi-plus-circle text-primary"></i>
                    </Button>
                    <Button variant="light">
                      <i className="bi bi-pencil text-secondary"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>

      {/* Modal Logic */}
      <Modal show={showModal} onHide={handleClose} centered>
        {showBSBAccountInfoScreen ? ( // Renamed
          <>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100">
                <p className="w-100 text-center mb-4 fw-bold text-primary fs-4">
                  Nhập thông tin tài khoản BSB
                </p>
              </div>

              <FloatingLabel
                controlId="floatingInput"
                label="THÔNG TIN TÀI KHOẢN BSB"
                className={`mb-4 ${
                  showError ? "text-danger" : "Thông tin này không thể để trống"
                }`}
              >
                <Form.Control
                  type="text"
                  placeholder="Nhập số tài khoản hoặc địa chỉ email"
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                  isInvalid={showError}
                />
              </FloatingLabel>
              {showError && (
                <small className="text-danger">
                  Thông tin này không thể để trống
                </small>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="text-light"
                onClick={handleSearchAccount}
              >
                TÌM NGƯỜI NHẬN
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <p className="w-100 text-center mb-4 fw-bold text-primary fs-4">
                Nhập thông tin tài khoản BSB
              </p>
              <FloatingLabel
                controlId="floatingInput"
                label="THÔNG TIN TÀI KHOẢN BSB"
                className={`mb-4 ${
                  showError ? "text-danger" : "Thông tin này không thể để trống"
                }`}
              >
                <Form.Control
                  type="text"
                  placeholder="Nhập số tài khoản hoặc địa chỉ email"
                  value={accountInfo}
                  onChange={(e) => setAccountInfo(e.target.value)}
                  isInvalid={showError}
                />
              </FloatingLabel>
              <small className="text-muted">{searchAccountInfo.fullName}</small>
              <FloatingLabel
                controlId="floatingInput"
                label="Tên gợi nhớ"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mb-4 mt-4"
              >
                <Form.Control type="text" placeholder="Nhập tên gợi nhớ" />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="text-light"
                variant="primary"
                onClick={handleSave}
              >
                LƯU NGƯỜI NHẬN
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default TransferMoney;
