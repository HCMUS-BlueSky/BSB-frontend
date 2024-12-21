import Navbar from "../../components/Navbar";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import {
  confirmTransfer,
  transferInternal,
} from "../../apis/services/Transaction";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../components/Loading/Loading";

const InternalTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [transaction, setTransaction] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      amount: "",
      description: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Vui lòng nhập số tài khoản"),
      amount: Yup.number()
        .min(1, "Số tiền phải lớn hơn 0")
        .required("Vui lòng nhập số tiền"),
      description: Yup.string()
        .max(255, "Mô tả không được vượt quá 255 ký tự")
        .required("Vui lòng nhập mô tả"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const response = await transferInternal(
        values.email,
        parseInt(values.amount),
        "SENDER",
        values.description
      );

      setLoading(false);
      if (response && response.statusCode === 200) {
        setStep(2);
        setTransaction(response.data);
      }
    },
  });

  const handleConfirm = async () => {
    setLoading(true);

    const response = await confirmTransfer(otp, transaction._id);

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
                      className={
                        step === 1 ? "step-circle active" : "step-circle"
                      }
                    >
                      1
                    </div>
                    <p className="mt-2">Vui lòng nhập thông tin Người nhận.</p>
                  </div>
                </Col>
                <Col>
                  <div className="w-100 d-flex flex-column align-items-center text-center">
                    <div
                      className={
                        step === 2 ? "step-circle active" : "step-circle"
                      }
                    >
                      2
                    </div>
                    <p className="mt-2">Xác nhận</p>
                  </div>
                </Col>
              </Row>
              {step === 1 ? (
                <Form onSubmit={formik.handleSubmit} className="w-100">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Nhập số tài khoản hoặc email"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInput"
                    label="Số tiền (VND)"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="1000"
                      {...formik.getFieldProps("amount")}
                    />
                    {formik.touched.amount && formik.errors.amount ? (
                      <div className="text-danger">{formik.errors.amount}</div>
                    ) : null}
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Mô tả"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-danger">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </FloatingLabel>

                  <Form.Check
                    type={"checkbox"}
                    id={`default-checkbox`}
                    label={`Lưu vào Danh sách Chuyển tiền`}
                    className="mb-3"
                  />

                  <Button
                    type="submit"
                    className="w-100 p-2 mt-3 text-light"
                    variant="primary"
                  >
                    <p className="p-1">Tiếp tục</p>
                  </Button>
                </Form>
              ) : (
                <Row className="w-100">
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Nhập OTP"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </FloatingLabel>

                    <div className="w-full d-flex gap-2">
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
                        <p className="p-1">CHUYỂN TIỀN</p>
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

export default InternalTransfer;
