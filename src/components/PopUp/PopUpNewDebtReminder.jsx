import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import DropdownBank from "../Dropdown/DropdownBank";
import { getReceiver } from "../../apis/services/Receiver";
import { addRemind } from "../../apis/services/Remind";
import { getUserInfo } from "../../apis/services/Account";

const PopUpNewDebtReminder = ({ show, setReload, handleClose }) => {
  const [bank, setBank] = useState([]);
  const [selectAccount, setSelectAccount] = useState("");
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [filterBank, setFilterBank] = useState([]);
  const [account, setAccount] = useState(null);

  const handleFilter = (value) => {
    setSelectAccount(value);
    if (value === "") {
      setFilterBank(bank);
    } else {
      const filterData = bank.filter((item) =>
        item.accountNumber.includes(value)
      );
      if (filterData.length === 0) {
        filterData.push({
          name: "Chọn để tiếp tục tìm kiếm",
          status: "error",
          accountNumber: value,
          bank: "Timo",
        });
      }
      setFilterBank(filterData);
    }
  };

  const handleFindAccount = async (accountNumber) => {
    console.log(accountNumber);
    if (!accountNumber || accountNumber.trim() === "") return;
    console.log(accountNumber);
    try {
      const response = await getUserInfo(accountNumber);
      setAccount({ name: response.data.fullName, status: "success" });
    } catch (error) {
      setAccount({
        name: "Không tìm thấy tài khoản",
        status: "error",
        message: "",
      });
      console.error("Error fetching account details:", error);
    }
  };

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
        setFilterBank(dataResponse);
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

      <Modal.Body onClick={() => setVisibleDropdown(false)}>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="d-flex justify-content-center align-items-center mb-3 w-100">
            <Col xs={12} md={10} className="text-center w-100">
              <div className="text-primary fw-bold fs-5">TẠO NHẮC NỢ MỚI</div>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center mb-4">
            <Col xs={12} md={10}>
              <FloatingLabel
                controlId="floatingInput"
                label="Nhập số tài khoản hoặc email"
                className=""
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  name="email"
                  value={selectAccount}
                  onFocus={() => setVisibleDropdown(true)}
                  onChange={(e) => handleFilter(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </FloatingLabel>
              {visibleDropdown && (
                <>
                  <DropdownBank
                    setVisibleDropdown={setVisibleDropdown}
                    bank={filterBank}
                    setSelectAccount={setSelectAccount}
                    formikFieldName="remindUserAccount"
                    setFieldValue={formik.setFieldValue}
                    handleFindAccount={handleFindAccount}
                  />
                  {formik.errors.remindUserAccount &&
                    formik.touched.remindUserAccount && (
                      <div className="text-danger">
                        {formik.errors.remindUserAccount}
                      </div>
                    )}
                </>
              )}

              {account && (
                <div
                  className="ms-1"
                  style={{
                    fontSize: "0.875rem",
                    color: account.status === "success" ? "#6c757d" : "#dc3545",
                    fontWeight: 400,
                    paddingTop: "10px",
                  }}
                >
                  {account.name}
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
