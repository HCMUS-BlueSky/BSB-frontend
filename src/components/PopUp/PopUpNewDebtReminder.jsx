// src/components/PopUpFindAccount.js
import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import DropdownBank from "../Dropdown/DropdownBank";
import { getReceiver } from "../../apis/services/Receiver";
import { addRemind } from "../../apis/services/Remind";

const PopUpNewDebtReminder = ({ show, handleClose }) => {

  const [bank, setBank] = useState([]);
  const [selectAccount, setSelectAccount] = useState("Chọn tài khoản bạn muốn nhắc nợ");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const dataRequest = {
      remindUserAccount: selectAccount,
      remindMessage: reason,
      amount: parseInt(amount),
    }
    try {
      const response = await addRemind(dataRequest);
      console.log("Add remind success: ", response);
      handleClose();
    } catch (error) {
      console.error("Failed to add remind: ", error.remindMessage);
    }
  };

  // const data = [
  //   { id: 1, name: "KHOI", icon:"", accountNumber: "13333423524545", bank: "Vietcombank" },
  //   { id: 2, name: "UYEN", icon:"", accountNumber: "13333423524545", bank: "Agribank" },
  //   { id: 3, name: "NHAN", icon:"", accountNumber: "13333423524545", bank: "Vietinbank" },
  // ];

  useEffect(() => {
    async function fetchReciverData(){
      try {
        const response = await getReceiver();
        const dataResponse = response.data.receiverList.map((data) => {
          return {
            id: data.id,
            name: data.nickname,
            icon: "",
            accountNumber: data.accountNumber,
            bank: data.type == "INTERNAL" ? "Timo" : data.bankName,
          }
        })
        setBank(dataResponse);
      } catch (error) {
        console.error("Failed to fetch receiver data:", error);
      }
    }
    fetchReciverData();
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
              label="Số tiền"
            >
              <Form.Control 
                type="number"
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
              label="Lý do (không bắt buộc)"
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
        <Col xs={12} md={10} className="mb-3">
          <Button 
            variant="primary" 
            // onClick={handleClose} 
            className="w-100 p-2"
            onClick={handleSubmit}
          >
            <div className="d-flex justify-content-center align-items-center">
              <span className="text-light">TẠO NHẮC NỢ MỚI</span>
            </div>
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default PopUpNewDebtReminder;
