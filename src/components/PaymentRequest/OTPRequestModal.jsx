import React from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const OTPRequestModal = ({ show, onHide, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP phải bao gồm 6 chữ số")
        .required("Vui lòng nhập mã OTP"),
    }),
    onSubmit: async (values) => {
      await onSubmit(values.otp);
      formik.resetForm();
      onHide();
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">Xác nhận OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="otp" label="Nhập mã OTP" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nhập mã OTP"
              {...formik.getFieldProps("otp")}
              isInvalid={formik.touched.otp && !!formik.errors.otp}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.otp}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          variant="secondary"
          onClick={onHide}
          className="text-white"
          style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
        >
          HỦY
        </Button>
        <Button type="submit" className="text-white" variant="primary">
          XÁC NHẬN
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPRequestModal;
