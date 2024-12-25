import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import DropdownBank from "../Dropdown/DropdownBank";
import { getReceiver } from "../../apis/services/Receiver";
import { addRemind } from "../../apis/services/Remind";

const PopUpNewDebtReminder = ({ show, setReload, handleClose }) => {
  const [bank, setBank] = useState([]);
  const [selectAccount, setSelectAccount] = useState("");

  useEffect(() => {
    async function fetchReceiverData() {
      try {
        const response = await getReceiver();
        const dataResponse = response.data.receiverList.map((data) => ({
          id: data.id,
          name: data.nickname,
          icon: "",
          accountNumber: data.accountNumber,
          bank: data.type === "INTERNAL" ? "Timo" : data.bankName,
        }));
        setBank(dataResponse);
      } catch (error) {
        console.error("Failed to fetch receiver data:", error);
      }
    }
    fetchReceiverData();
  }, []);

  const formik = useFormik({
    initialValues: {
      remindUserAccount: "",
      amount: "",
      remindMessage: "",
    },
    validationSchema: Yup.object({
      remindUserAccount: Yup.string().required(
        "Vui lòng chọn tài khoản bạn muốn nhắc nợ."
      ),
      amount: Yup.number()
        .required("Số tiền là bắt buộc.")
        .min(1, "Số tiền phải lớn hơn 0."),
      remindMessage: Yup.string().max(
        255,
        "Lý do không được vượt quá 255 ký tự."
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await addRemind({
          accountNumber: values.remindUserAccount,
          message: values.remindMessage,
          amount: values.amount,
        });

        if (response.statusCode === 200) {
          resetForm();
          setReload((prev) => !prev);
        }
      } catch (error) {
        console.error(
          "Failed to add remind: ",
          error.response?.data || error.message
        );
      }
      handleClose();
    },
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered
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
        <Form onSubmit={formik.handleSubmit}>
          <Row className="d-flex justify-content-center align-items-center mb-3 w-100">
            <Col xs={12} md={10} className="text-center w-100">
              <div className="text-primary fw-bold fs-5">TẠO NHẮC NỢ MỚI</div>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center mb-4">
            <Col xs={12} md={10}>
              <DropdownBank
                bank={bank}
                selectedBank={selectAccount}
                setSelectedBank={setSelectAccount}
                formikFieldName="remindUserAccount"
                setFieldValue={formik.setFieldValue}
              />
              {formik.errors.remindUserAccount &&
                formik.touched.remindUserAccount && (
                  <div className="text-danger">
                    {formik.errors.remindUserAccount}
                  </div>
                )}
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center mb-4">
            <Col xs={12} md={10}>
              <FloatingLabel controlId="txtAmount" label="Số tiền">
                <Form.Control
                  type="number"
                  placeholder="123456789"
                  className="w-100"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FloatingLabel>
              {formik.errors.amount && formik.touched.amount && (
                <div className="text-danger">{formik.errors.amount}</div>
              )}
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center mb-4">
            <Col xs={12} md={10}>
              <FloatingLabel controlId="txtReason" label="Lý do">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder=""
                  className="w-100"
                  name="remindMessage"
                  value={formik.values.remindMessage}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FloatingLabel>
              {formik.errors.remindMessage && formik.touched.remindMessage && (
                <div className="text-danger">{formik.errors.remindMessage}</div>
              )}
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center mb-3">
            <Col xs={12} md={10} className="mb-3">
              <Button variant="primary" className="w-100 p-2" type="submit">
                <div className="d-flex justify-content-center align-items-center">
                  <span className="text-light">TẠO NHẮC NỢ MỚI</span>
                </div>
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpNewDebtReminder;
