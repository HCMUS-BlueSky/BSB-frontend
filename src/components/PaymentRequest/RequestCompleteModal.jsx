import React from "react";
import { Modal, Button } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const RequestCompleteModal = ({ show, onHide, data }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center text-center justify-content-center w-100">
          <h5 className="mb-3 fw-bold">Nhắc nợ tới</h5>
          <h4 className="mb-4 fw-bold">{data?.name}</h4>

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

          <p className="text-muted mb-4">{formatDate(data?.updatedAt)}</p>

          <h2 className="mb-4 fw-bold">{formatCurrency(data?.amount)}</h2>

          <div className="border border-danger rounded p-3 text-success mb-4 w-100">
            Nhắc nợ này đã được thanh toán bởi{" "}
            <span className="fw-bold">{data?.name}</span> vào ngày{" "}
            <span className="fw-bold">{formatDate(data?.updatedAt)}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={onHide} className="text-white w-100">
          XÓA NHẮC NỢ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestCompleteModal;
