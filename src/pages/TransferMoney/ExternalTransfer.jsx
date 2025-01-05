import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import DropdownExternalBank from "../../components/Dropdown/DropdownExternalBank";
import { getRegisteredBanks } from "../../apis/services/Bank";
import { getExternalUserByAccountNumber } from "../../apis/services/Account";
import Loading from "../../components/Loading/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  confirmExternalTransfer,
  transferExternal,
} from "../../apis/services/Transaction";

const ExternalTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState({ name: "" });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await getRegisteredBanks();
      setBanks(response.data);
      setSelectedBank(response.data[0]);
    }
    fetchData();
  }, []);

  const handleFindAccount = async (value) => {
    const response = await getExternalUserByAccountNumber(
      value,
      selectedBank._id
    );
    if (response.statusCode !== 200) {
      setSelectedAccount(null);
      return;
    }

    setSelectedAccount(response.data.full_name);
  };

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      bankId: "",
      amount: "",
      description: "",
    },
    validationSchema: Yup.object({
      accountNumber: Yup.string().required("Vui lòng nhập số tài khoản"),
      amount: Yup.number()
        .min(1, "Số tiền phải lớn hơn 0")
        .required("Vui lòng nhập số tiền"),
      description: Yup.string()
        .max(255, "Mô tả không được vượt quá 255 ký tự")
        .required("Vui lòng nhập nội dung chuyển khoản"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await transferExternal(
        values.accountNumber,
        selectedBank._id,
        parseInt(values.amount),
        values.description,
        false
      );

      setLoading(false);
      if (response && response.statusCode === 200) {
        setTransaction(response.data);
        setStep(2);
      }
    },
  });

  const handleConfirm = async () => {
    setLoading(true);

    const response = await confirmExternalTransfer(otp, transaction._id);

    setLoading(false);

    if (response && response.statusCode === 200) {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col xs={10} md={6}>
            <div className="w-100 bg-light p-4 rounded d-flex flex-column justify-content-between align-items-center">
              <Row className="w-100 mb-5">
                <Col>
                  <div className="w-100 d-flex flex-column align-items-center text-center">
                    <div
                      className={`step-circle ${step === 1 ? "active" : ""}`}
                    >
                      1
                    </div>
                    <p className="mt-2">Vui lòng nhập thông tin Người nhận.</p>
                  </div>
                </Col>
                <Col>
                  <div className="w-100 d-flex flex-column align-items-center text-center">
                    <div
                      className={`step-circle ${step === 2 ? "active" : ""}`}
                    >
                      2
                    </div>
                    <p className="mt-2">Xác nhận</p>
                  </div>
                </Col>
              </Row>

              {step === 1 ? (
                <Form onSubmit={formik.handleSubmit} className="w-100">
                  <DropdownExternalBank
                    banks={banks}
                    selectedBank={selectedBank}
                    setSelectedBank={setSelectedBank}
                  />
                  <FloatingLabel
                    controlId="floatingAccountNumber"
                    label="Nhập số tài khoản"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="accountNumber"
                      placeholder="Nhập số tài khoản"
                      value={formik.values.accountNumber}
                      onChange={formik.handleChange}
                      onBlur={(e) => handleFindAccount(e.target.value)}
                    />
                    {formik.touched.accountNumber &&
                      formik.errors.accountNumber && (
                        <div className="text-danger">
                          {formik.errors.accountNumber}
                        </div>
                      )}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingUser"
                    label="Người dùng"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Người dùng"
                      value={selectedAccount || ""}
                      readOnly
                      disabled
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingAmount"
                    label="Số tiền"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="amount"
                      placeholder="Nhập số tiền"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.amount && formik.errors.amount && (
                      <div className="text-danger">{formik.errors.amount}</div>
                    )}
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingDescription"
                    label="Lý do"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      name="description"
                      placeholder="Nhập lý do"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      )}
                  </FloatingLabel>
                  <Button
                    type="submit"
                    className="w-100 p-2 mt-3 text-light"
                    variant="primary"
                  >
                    Tiếp tục
                  </Button>
                </Form>
              ) : (
                <Row className="w-100">
                  <Col>
                    <FloatingLabel
                      controlId="floatingOtp"
                      label="Nhập OTP"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Nhập OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </FloatingLabel>
                    <div className="d-flex gap-2">
                      <Button
                        onClick={() => setStep(1)}
                        className="w-50 p-2 mt-3 text-light"
                        variant="primary"
                      >
                        <p className="p-1">QUAY LẠI</p>
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        className="w-50 p-2 mt-3 text-light"
                        variant="primary"
                      >
                        Chuyển tiền
                      </Button>
                    </div>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      {loading && <Loading />}
    </>
  );
};

export default ExternalTransfer;
