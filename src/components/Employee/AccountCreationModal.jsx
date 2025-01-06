import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const AccountCreationModal = ({ show, handleClose, handleSave }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      phone: "",
      address: "",
      dob: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
      password: Yup.string()
        .min(6, "Mật khẩu phải ít nhất 6 ký tự")
        .required("Bắt buộc"),
      fullName: Yup.string().required("Bắt buộc"),
      phone: Yup.string()
        .matches(/^\d{10,11}$/, "SĐT phải chứa 10-11 chữ số")
        .required("Bắt buộc"),
      address: Yup.string().required("Bắt buộc"),
      dob: Yup.date()
        .required("Bắt buộc")
        .nullable()
        .typeError("Ngày sinh không hợp lệ"),
    }),
    onSubmit: (values) => {
      handleSave(values);
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo tài khoản mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập họ tên"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.fullName && formik.errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>SĐT</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Nhập SĐT"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phone && formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.address && formik.errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.dob && formik.errors.dob}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dob}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          className="text-light"
        >
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccountCreationModal;
