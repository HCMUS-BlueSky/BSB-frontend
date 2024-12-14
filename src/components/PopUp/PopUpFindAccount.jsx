// src/components/PopUpFindAccount.js
import React, { useEffect } from "react";
import { Button, Modal, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import DropdownBack from "../Dropdown/DropdownBank";

const PopUpFindAccount = ({ show, handleClose }) => {

  const [bank, setBank] = useState([]);
  const [selectedBank, setSelectedBank] = useState("CHỌN NGÂN HÀNG");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = () => {
    console.log("Bank: ", selectedBank);
    console.log("Account Number: ", accountNumber);
  };


  useEffect(() => {
    // const fetchBank = async () => {
    //   try {
    //     const response = await fetch("https://api.bsb.com/bank");
    //     const data = await response.json();
    //     setBank(data);
    //   } catch (error) {
    //     console.error("Error: ", error);
    //   }
    // };
    // fetchBank();
    const data = [
      { id: 1, name: "Vietcombank", icon: "", description: "NHTMCP NGOAI THUONG VN"  },
      { id: 2, name: "Agribank", icon: "", description: "NH NONG NGHIEP PTNT VN" },
      { id: 3, name: "Vietinbank", icon: "", description: "NHTMCP CONG THUONG VN" },
    ];
    setBank(data);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header
        className="d-flex justify-content-between p-2"
        style={{ height: '40px' }}
      >
        <Button variant="secondary" onClick={handleClose} className="d-flex align-items-center">
          <i className="bi bi-arrow-left"></i>
        </Button>
        <Button variant="secondary" onClick={handleClose} className="d-flex align-items-center">
          <i className="bi bi-x-lg"></i>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-center align-items-center mb-3">
          <Col xs={12} md={10} className="text-center">
            <img src="" alt="BSB Logo" />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center mb-3 ">
          <Col xs={12} md={10} className="text-center">
            <div className="text-primary fw-bold text-center">
              NHẬP THÔNG TIN TÀI KHOẢN BSB
              </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center mb-3">
          <Col xs={12} md={10}>
            <DropdownBack 
              bank={bank} 
              selectedBank={selectedBank} 
              setSelectedBank={setSelectedBank}
            />
          </Col>
        </Row>


        <Row className="d-flex justify-content-center align-items-center mb-3 ">
          <Col xs={12} md={10}>
            <FloatingLabel className="shadow-sm" controlId="txtAccountNumber" label="THÔNG TIN TÀI KHOẢN" >
              <Form.Control 
                placeholder="123456789" 
                className="w-100" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Modal.Body>

      {/* Button "Tìm người nhận" */}
      <Row className="d-flex justify-content-center mb-3">
        <Col xs={12} md={10} className="px-4"> {/* Responsive col */}
          <Button 
            variant="primary" 
            onClick={handleSubmit} 
            className="w-100 p-2" // Full width and padding
          >
            {/* Căn giữa chữ "Tìm người nhận" */}
            <div className="d-flex justify-content-center align-items-center">
              <span className="text-light fw-bold">Tìm người nhận</span>
            </div>
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default PopUpFindAccount;
