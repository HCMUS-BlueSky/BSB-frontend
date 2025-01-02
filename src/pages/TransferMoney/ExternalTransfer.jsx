import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Container, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import DropdownExternalBank from "../../components/Dropdown/DropdownExternalBank";

const ExternalTransfer = () => {
  const [step, setStep] = useState(1); // Quản lý bước hiện tại
  const [banks, setBanks] = useState([
    { id: 1, name: "Ngân hàng A", bank: "Ngân hàng TMCP Công Thương Việt Nam", icon: null },
    { id: 2, name: "Ngân hàng B", bank: "Ngân hàng Đầu tư và Phát triển Việt Nam", icon: null },
    { id: 3, name: "Ngân hàng C", bank: "Ngân hàng Ngoại thương Việt Nam", icon: null },
  ]);

  const [accounts, setAccounts] = useState([
    { id: 1, accountNumber: "123456789A", accountName: "Nguyễn Văn A" },
    { id: 2, accountNumber: "123456789B", accountName: "Nguyễn Văn B" },
    { id: 3, accountNumber: "123456789C", accountName: "Nguyễn Văn C" },
  ]);

  const [selectedBank, setSelectedBank] = useState(null); // Ngân hàng được chọn
  const [selectedAccount, setSelectedAccount] = useState(null); // Tài khoản được chọn
  const [otp, setOtp] = useState(""); // Mã OTP

  // Tìm tài khoản theo số tài khoản
  const handleFindAccount = (value) => {
    const account = accounts.find((acc) => acc.accountNumber === value);
    setSelectedAccount(account ? account.accountName : "Không tìm thấy tài khoản");
  };

  // Xử lý gửi thông tin
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Chuyển sang bước xác nhận
  };

  // Xử lý xác nhận OTP
  const handleConfirm = () => {
    console.log("OTP:", otp);
    // Thực hiện hành động sau khi xác nhận
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={6}>
            <div className="w-100 bg-light p-4 rounded d-flex flex-column justify-content-between align-items-center">
              {/* Bước */}
              <Row className="w-100 mb-5">
                <Col>
                  <div className="w-100 d-flex flex-column align-items-center text-center">
                    <div className={`step-circle ${step === 1 ? "active" : ""}`}>1</div>
                    <p className="mt-2">Vui lòng nhập thông tin Người nhận.</p>
                  </div>
                </Col>
                <Col>
                  <div className="w-100 d-flex flex-column align-items-center text-center">
                    <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
                    <p className="mt-2">Xác nhận</p>
                  </div>
                </Col>
              </Row>

              {/* Nội dung từng bước */}
              {step === 1 ? (
                <Form onSubmit={handleSubmit} className="w-100">
                  <DropdownExternalBank banks={banks} selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
                  <FloatingLabel controlId="floatingInput" label="Nhập số tài khoản" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Nhập số tài khoản"
                      onBlur={(e) => handleFindAccount(e.target.value)}
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Người dùng" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Người dùng"
                      value={selectedAccount || ""}
                      readOnly
                      disabled
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Số tiền" className="mb-3">
                    <Form.Control type="text" placeholder="Nhập số tiền" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Lý do" className="mb-3">
                    <Form.Control as="textarea" style={{ height: "100px" }} placeholder="Nhập lý do" />
                  </FloatingLabel>
                  <Button type="submit" className="w-100 p-2 mt-3 text-light" variant="primary">
                    Tiếp tục
                  </Button>
                </Form>
              ) : (
                <Row className="w-100">
                  <Col>
                    <FloatingLabel controlId="floatingInput" label="Nhập OTP" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Nhập OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </FloatingLabel>
                    <div className="d-flex gap-2">
                      <Button
                          onClick={() => setStep(1)}
                          className="w-50 p-2 mt-3 text-light"
                          variant="primary"
                        >
                          <p className="p-1">QUAY LẠI</p>
                        </Button>
                        <Button onClick={handleConfirm} className="w-50 p-2 mt-3 text-light" variant="primary">
                          Chuyển tiền
                        </Button>
                      </div>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExternalTransfer;
