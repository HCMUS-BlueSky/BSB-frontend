import React, { useState } from "react";
import { Modal, Button, Form, Image, FloatingLabel } from "react-bootstrap";
import { Field, Formik, Form as FormikForm } from "formik";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import OTPRequestModal from "./OTPRequestModal";
import {
  confirmRemind,
  deleteRemind,
  sendOtpForRemind,
} from "../../apis/services/Remind";
import Loading from "../Loading/Loading";

const RequestFromModal = ({ setReload, show, onHide, data }) => {
  const [otpModalShow, setOtpModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteInput, setShowDeleteInput] = useState(false);

  const handleCancelDebt = async (values) => {
    try {
      const response = await deleteRemind(data._id, values.deleteMessage);

      if (response.statusCode === 200) {
        setReload((prev) => !prev);
      }

      onHide();
    } catch (error) {
      console.error("Lỗi khi hủy nhắc nợ:", error);
    }
  };

  const handlePaymentClick = async () => {
    setLoading(true);
    try {
      const response = await sendOtpForRemind(data._id);
      if (response && response.statusCode === 200) {
        onHide();
        setOtpModalShow(true);
      }
    } catch (error) {
      console.error("Lỗi khi gửi mã OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (otp) => {
    try {
      const response = await confirmRemind(data._id, otp);
      if (response.statusCode === 200) {
        setReload((prev) => !prev);
        setOtpModalShow(false);
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận mã OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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

            <div className="w-100 d-flex gap-2">
              <Button
                variant="danger"
                hidden={showDeleteInput}
                onClick={() => setShowDeleteInput(!showDeleteInput)}
                className="w-100 text-white"
                style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
              >
                HỦY NHẮC NỢ
              </Button>
              <Button
                variant="success"
                hidden={showDeleteInput}
                onClick={handlePaymentClick}
                className="w-100 text-white"
                style={{ backgroundColor: "#198754", borderColor: "#198754" }}
              >
                THANH TOÁN
              </Button>
            </div>

            {showDeleteInput && (
              <Formik
                initialValues={{ deleteMessage: "" }}
                onSubmit={handleCancelDebt}
              >
                {({ handleChange, handleBlur, values }) => (
                  <FormikForm className="w-100">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Lý do hủy nhắc nợ"
                      className="mb-3 w-100"
                    >
                      <Field
                        as={Form.Control}
                        type="text"
                        placeholder="Nhập thông tin xóa"
                        name="deleteMessage"
                        value={values.deleteMessage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FloatingLabel>
                    <Button
                      variant="danger"
                      type="submit"
                      className="w-100 text-white"
                      style={{
                        backgroundColor: "#dc3545",
                        borderColor: "#dc3545",
                      }}
                    >
                      XÁC NHẬN HỦY NHẮC NỢ
                    </Button>
                  </FormikForm>
                )}
              </Formik>
            )}
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
