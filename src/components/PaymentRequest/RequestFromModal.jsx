import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import OTPRequestModal from "./OTPRequestModal";

const RequestFromModal = ({ show, onHide, data }) => {
  const [otpModalShow, setOtpModalShow] = useState(false);

  const handlePaymentClick = () => {
    setOtpModalShow(true);
    onHide(); // Close the current modal
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center text-center justify-content-center w-100">
            <h6 className="mb-2">Nhắc nợ tới</h6>
            <h4 className="mb-2 fw-bold text-primary">{data?.name}</h4>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="me-2">
                <div
                  className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  TÔI
                </div>
              </div>
              <div>
                <i className="text-success bi bi-arrow-right"></i>
              </div>
              <div className="ms-2">
                <div
                  className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-person"></i>
                </div>
              </div>
            </div>

            <p className="text-muted mb-4">{formatDate(data?.date)}</p>

            <h2 className="mb-4 fw-bold">{formatCurrency(data?.amount)}</h2>

            <p className="text-muted mb-4">
              {data?.description
                ? data.description
                : "Không có nội dung nhắc nợ"}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="danger"
            onClick={onHide}
            className="text-white"
            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
          >
            HỦY NHẮC NỢ
          </Button>
          <Button
            variant="success"
            onClick={handlePaymentClick}
            className="text-white"
            style={{ backgroundColor: "#198754", borderColor: "#198754" }}
          >
            THANH TOÁN
          </Button>
        </Modal.Footer>
      </Modal>

      <OTPRequestModal
        show={otpModalShow}
        onHide={() => setOtpModalShow(false)}
        onSubmit={(otp) => {
          console.log("OTP submitted:", otp);
          setOtpModalShow(false);
        }}
      />
    </>
  );
};

export default RequestFromModal;
