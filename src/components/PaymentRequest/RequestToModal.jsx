import React from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { Formik, Field, Form as FormikForm } from "formik";
import { deleteRemind } from "../../apis/services/Remind"; // Import API hủy nhắc nợ

const RequestToModal = ({ show, onHide, data }) => {
  // Handle submit for the "Hủy Nhắc Nợ" action
  const handleCancelDebt = async (values) => {
    try {
      // Gọi API hủy nhắc nợ
      const response = await deleteRemind(data.id); // Giả sử bạn có `id` trong `data`
      console.log("Xóa nhắc nợ thành công:", response);

      // Nếu thành công, đóng modal
      onHide(); 
    } catch (error) {
      console.error("Lỗi khi hủy nhắc nợ:", error);
      // Có thể thêm logic thông báo lỗi cho người dùng
    }
  };

  return (
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
            {data?.description ? data.description : "Không có nội dung nhắc nợ"}
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={{ cancelInfo: "" }}
            onSubmit={handleCancelDebt}
          >
            {({ handleChange, handleBlur, values }) => (
              <FormikForm>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Thông tin xóa"
                  className="mb-3 w-100"
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    placeholder="Nhập thông tin xóa"
                    name="cancelInfo"
                    value={values.cancelInfo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FloatingLabel>
                <Button
                  variant="danger"
                  type="submit"
                  className="w-100 text-white"
                  style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                >
                  HỦY NHẮC NỢ
                </Button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RequestToModal;
