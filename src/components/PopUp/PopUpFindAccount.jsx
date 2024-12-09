// src/components/PopUpFindAccount.js
import React, { useEffect } from "react";
import { Button, Modal, Row, Col, Form, FloatingLabel, Dropdown } from "react-bootstrap";
import { useState } from "react";
import DropdownBack from "../Dropdown/DropdownBank";

const PopUpFindAccount = ({ show, handleClose }) => {

  const [bank, setBank] = useState([]);

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
      { id: 1, name: "Vietcombank", icon: "" },
      { id: 2, name: "Techcombank", icon: "" },
      { id: 3, name: "BIDV", icon: "" },
    ];
    setBank(data);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="md"> {/* Modal size */}
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
        <Row className="d-flex justify-content-between  align-items-center mb-3 ">
          <Col xs={12} md={10} className="text-center">
            <div className="text-primary fw-bold">NHẬP THÔNG TIN TÀI KHOẢN BSB</div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center mb-3">
          <Col xs={12} md={10}>
            <DropdownBack bank={bank}/>
          </Col>
        </Row>


        <Row className="d-flex justify-content-center align-items-center mb-3 ">
          <Col xs={12} md={10}>
            <FloatingLabel className="shadow-sm" controlId="txtAccountNumber" label="THÔNG TIN TÀI KHOẢN" >
              <Form.Control placeholder="123456789" className="w-100" />
            </FloatingLabel>
          </Col>
        </Row>
      </Modal.Body>

      {/* Button "Tìm người nhận" */}
      <Row className="d-flex justify-content-center mb-3">
        <Col xs={12} md={10} className="px-4"> {/* Responsive col */}
          <Button 
            variant="primary" 
            onClick={handleClose} 
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
