import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import OTPRequestModal from "./OTPRequestModal";
import { deleteRemind, updateRemind } from "../../apis/services/Remind";
import { transferInternal, confirmTransfer } from "../../apis/services/Transaction";
import { useNavigate } from "react-router-dom";

const RequestFromModal = ({ show, onHide, data }) => {
  const [otpModalShow, setOtpModalShow] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      confirmText: "",
    },
    validationSchema: Yup.object({
      confirmText: Yup.string()
        .oneOf(["XÓA"], "Vui lòng nhập 'XÓA' để xác nhận xóa nhắc nợ")
        .required("Bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await deleteRemind(data.id); 
        console.log("Xóa nhắc nợ thành công:", response);
        onHide();
      } catch (error) {
        console.error("Lỗi khi xóa nhắc nợ:", error);
      }
    },
  });

  const handlePaymentClick = async () => {
    console.log("OTP modal sẽ hiển thị");
    const response = await transferInternal(
      data.email,
      parseInt(data.amount),
      "SENDER",
      "Thanh toán nhắc nợ"
    )

    if (response && response.statusCode === 200) {
      setOtpModalShow(true);
      setTransaction(response.data);
      onHide();
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center text-center justify-content-center w-100">
            <h4 className="mb-2 fw-bold text-primary">{data?.name}</h4>
            <h6 className="mb-2">Nhắc nợ tới</h6>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="ms-2">
                <div
                  className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="bi bi-person"></i>
                </div>
              </div>
              <div>
                <i className="text-success bi bi-arrow-right"></i>
              </div>

              <div className="me-2">
                <div
                  className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  TÔI
                </div>
              </div>
            </div>

            <p className="text-muted mb-4">{formatDate(data?.date)}</p>

            <h2 className="mb-4 fw-bold">{formatCurrency(data?.amount)}</h2>

            <p className="text-muted mb-4">
              {data?.description ? data.description : "Không có nội dung nhắc nợ"}
            </p>

            {/* Form xác nhận xóa */}
            <Form noValidate onSubmit={formik.handleSubmit}>
              <p>
                Bạn đang cố gắng xóa nhắc nợ <strong>{data?.name}</strong>.
                Vui lòng nhập <strong>"XÓA"</strong> để xác nhận.
              </p>

              <Form.Group className="mb-3">
                <Form.Label>Xác nhận xóa</Form.Label>
                <Form.Control
                  type="text"
                  name="confirmText"
                  value={formik.values.confirmText}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.confirmText && formik.errors.confirmText}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmText}
                </Form.Control.Feedback>
              </Form.Group>

              <Modal.Footer className="justify-content-center">
                <Button
                  variant="danger"
                  onClick={formik.handleSubmit}
                  className="text-white"
                  style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                >
                  HỦY NHẮC NỢ
                </Button>
                <Button
                  variant="success"
                  onClick={handlePaymentClick} // Mở OTP modal khi nhấn thanh toán
                  className="text-white"
                  style={{ backgroundColor: "#198754", borderColor: "#198754" }}
                >
                  THANH TOÁN
                </Button>
              </Modal.Footer>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <OTPRequestModal
        show={otpModalShow}
        onHide={() => setOtpModalShow(false)}
        onSubmit={async (otp) => {
          console.log("OTP submitted:", otp);
          const response = await confirmTransfer(otp, transaction._id);
          if (response && response.statusCode === 200) {
            const responseUpdate = await updateRemind(data.id);
            if (responseUpdate && responseUpdate.statusCode === 200) {
              navigate("/");
              setOtpModalShow(false);
            }

          }
        }}
      />
    </>
  );
};

export default RequestFromModal;

