import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import OTPRequestModal from "./OTPRequestModal";
import {
  confirmRemind,
  deleteRemind,
  sendOtpForRemind,
} from "../../apis/services/Remind";
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
    const response = await sendOtpForRemind(data._id);

    if (response && response.statusCode === 200) {
      setOtpModalShow(true);
      setTransaction(response.data);
      onHide();
    }
  };

  const handleSubmitOtp = async (otp) => {
    console.log("OTP submitted:", otp);
    const response = await confirmRemind(data._id, otp);
    console.log("Confirm transfer response:", response);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center text-center justify-content-center w-100">
            <h4 className="mb-2 fw-bold text-primary">{data?.name}</h4>
            <h6 className="mb-2">Nhắc nợ tới</h6>

            <div className="d-flex align-items-center justify-content-center mb-3 gap-2">
              <div className="ms-2">
                <div
                  className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <Image
                    src="/img/profile/default.svg"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
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

            <p className="text-muted mb-4">{formatDate(data?.createdAt)}</p>

            <h2 className="mb-4 fw-bold">{formatCurrency(data?.amount)}</h2>

            <h7>Lý do nhắc nợ</h7>

            <p className="text-muted mb-4">
              {data?.message ? data.message : "Không có nội dung nhắc nợ"}
            </p>

            <Form noValidate className="w-100" onSubmit={formik.handleSubmit}>
              {/* <p>
                Bạn đang cố gắng xóa nhắc nợ <strong>{data?.name}</strong>. Vui
                lòng nhập <strong>"XÓA"</strong> để xác nhận.
              </p> */}

              {/* <Form.Group className="mb-3">
                <Form.Label>Xác nhận xóa</Form.Label>
                <Form.Control
                  type="text"
                  name="confirmText"
                  value={formik.values.confirmText}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.confirmText && formik.errors.confirmText
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmText}
                </Form.Control.Feedback>
              </Form.Group> */}

              <div className="w-100 d-flex gap-2">
                <Button
                  variant="danger"
                  onClick={formik.handleSubmit}
                  className="w-100 text-white"
                  style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                >
                  HỦY NHẮC NỢ
                </Button>
                <Button
                  variant="success"
                  onClick={handlePaymentClick}
                  className="w-100 text-white"
                  style={{ backgroundColor: "#198754", borderColor: "#198754" }}
                >
                  THANH TOÁN
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <OTPRequestModal
        show={otpModalShow}
        onHide={() => setOtpModalShow(false)}
        onSubmit={handleSubmitOtp}
      />
    </>
  );
};

export default RequestFromModal;
