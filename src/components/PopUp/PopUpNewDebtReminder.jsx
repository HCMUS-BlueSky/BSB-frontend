// src/components/PopUpFindAccount.js
import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import DropdownBank from "../Dropdown/DropdownBank";

const PopUpNewDebtReminder = ({ show, handleClose, debtReminders, setDebtReminders }) => {

  const [bank, setBank] = useState([]);
  const [selectAccount, setSelectAccount] = useState("BẠN MUỐN NHẮC NỢ TỚI AI?");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    console.log("Bank: ", selectAccount);
    console.log("Amount: ", amount);
    console.log("Reason: ", reason);
    const newDebtReminder = {
      name: selectAccount,
      profilePic: "https://my.timo.vn/static/media/default_avatar.32a9a6f8.svg",
      amount: amount,
      direction: "tới",
      reason: reason,
      date: new Date().toLocaleDateString(),
    }
    setDebtReminders([...debtReminders, newDebtReminder]);
  };

  useEffect(() => {
    const data = [
      { id: 1, name: "KHOI", icon:"", description: "LEADER" },
      { id: 2, name: "UYEN", icon:"", description: "KHUNG" },
      { id: 3, name: "NHAN", icon:"", description: "TRAM" },
    ];
    setBank(data);
  }, []);

  return (
    <Modal show={show} 
      onHide={handleClose} 
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header className="d-flex justify-content-between p-2">
        <Button 
          variant="secondary" 
          onClick={handleClose} 
          className="d-flex align-items-center"
        >
          <i className="bi bi-arrow-left"></i>
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleClose} 
          className="d-flex align-items-center"
        >
          <i className="bi bi-x-lg"></i>
        </Button>
      </Modal.Header>

      <Modal.Body>
        <Row className="d-flex justify-content-center align-items-center mb-3">
          <Col 
            xs={12} md={10} 
            className="text-center"
          >
            <img src="" alt="BSB Logo" />
          </Col>
        </Row>

        <Row className="d-flex justify-content-center align-items-center mb-3 w-100">
          <Col 
            xs={12} md={10} 
            className="text-center w-100"
          >
            <div className="text-primary fw-bold fs-5">TẠO NHẮC NỢ MỚI</div>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center align-items-center mb-4">
          <Col xs={12} md={10}>
            <DropdownBank bank={bank} selectedBank={selectAccount} setSelectedBank={setSelectAccount}/>        
          </Col>
        </Row>

        <Row className="d-flex justify-content-center align-items-center mb-4">
          <Col xs={12} md={10}>
            <FloatingLabel 
              className="shadow-sm" 
              controlId="txtAccountNumber" 
              label="SỐ TIỀN"
            >
              <Form.Control 
                placeholder="123456789" 
                className="w-100" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center align-items-center mb-4">
          <Col xs={12} md={10}>
            <FloatingLabel 
              className="shadow-sm" 
              controlId="txtAccountNumber" 
              label="LÝ DO (KHÔNG BẮT BUỘC)"
            >
              <Form.Control 
                as="textarea"
                rows={3}
                placeholder="" 
                className="w-100"
                value={reason}
                onChange={(e) => setReason(e.target.value)} 
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Modal.Body>

      {/* Button "Tìm người nhận" */}
      <Row className="d-flex justify-content-center align-items-center mb-3 mx-1">
        <Col xs={12} md={10}>
          <Button 
            variant="primary" 
            // onClick={handleClose} 
            className="w-100 p-2"
            onClick={handleSubmit}
          >
            <div className="d-flex justify-content-center align-items-center">
              <span className="text-light fw-bold">Tìm người nhận</span>
            </div>
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default PopUpNewDebtReminder;
