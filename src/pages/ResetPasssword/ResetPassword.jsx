import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Toast,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import {  resetPassword } from "../../apis/services/Auth";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastVariant, setToastVariant] = React.useState("success");

  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu mới"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
        .required("Vui lòng xác nhận mật khẩu"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token = new URLSearchParams(location.search).get("token");

      try {
        const resp=await resetPassword(values.newPassword, token);
        console.log("AAA",resp);
        setToastMessage("Mật khẩu đã được thay đổi thành công!");
        setToastVariant("success");
        resetForm(); 
      } catch (error) {
        setToastMessage("Đổi mật khẩu thất bại! Vui lòng thử lại.");
        setToastVariant("danger");
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); 
      
    },
  });

  return (
    <>
      <Container
        fluid
        className="min-vh-100 d-flex justify-content-center align-items-center"
      >
        <Row className="w-100">
          <Col xs={8} md={6} lg={4} className="mx-auto">
            <Card className="p-4">
              <Card.Title>
                <h3 className="w-100 text-center mt-3">Đổi mật khẩu</h3>
              </Card.Title>
              <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
            
                  {/* New Password */}
                  <FloatingLabel
                    className="mb-3"
                    controlId="newPassword"
                    label="Mật khẩu mới"
                  >
                    <Form.Control
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      {...formik.getFieldProps("newPassword")}
                      isInvalid={
                        formik.touched.newPassword &&
                        !!formik.errors.newPassword
                      }
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="position-absolute end-0 top-50 translate-middle-y"
                      style={{ border: "none" }}
                    >
                      <i
                        className={
                          showNewPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                      ></i>
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.newPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  {/* Confirm Password */}
                  <FloatingLabel
                    className="mb-3"
                    controlId="confirmPassword"
                    label="Xác nhận mật khẩu"
                  >
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...formik.getFieldProps("confirmPassword")}
                      isInvalid={
                        formik.touched.confirmPassword &&
                        !!formik.errors.confirmPassword
                      }
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="position-absolute end-0 top-50 translate-middle-y"
                      style={{ border: "none" }}
                    >
                      <i
                        className={
                          showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                        }
                      ></i>
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <Button
                    type="submit"
                    className="w-100 text-light p-2 mt-3"
                    variant="primary"
                  >
                    ĐỔI MẬT KHẨU
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1050,
        }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          autohide
          bg={toastVariant}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default ResetPassword;
