import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
      newPassword: Yup.string()
        .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu mới"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
        .required("Vui lòng xác nhận mật khẩu"),
    }),
    onSubmit: async (values) => {
      await changePassword(values.oldPassword, values.newPassword);
    },
  });

  return (
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
                {/* Old Password */}
                <FloatingLabel
                  className="mb-3"
                  controlId="oldPassword"
                  label="Mật khẩu hiện tại"
                >
                  <Form.Control
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Current Password"
                    {...formik.getFieldProps("oldPassword")}
                    isInvalid={
                      formik.touched.oldPassword && !!formik.errors.oldPassword
                    }
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="position-absolute end-0 top-50 translate-middle-y"
                    style={{ border: "none" }}
                  >
                    <i
                      className={
                        showOldPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      }
                    ></i>
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.oldPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>

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
                      formik.touched.newPassword && !!formik.errors.newPassword
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
  );
};

export default ChangePassword;
