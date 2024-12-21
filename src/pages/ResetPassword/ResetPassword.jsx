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
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [emailSent, setEmailSent] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword(values.email);
        setEmailSent(true);
      } catch (error) {
        alert("Không thể gửi yêu cầu, vui lòng thử lại sau.");
      }
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
              <h3 className="w-100 text-center mt-3">Quên mật khẩu</h3>
            </Card.Title>
            <Card.Body>
              {emailSent ? (
                <div className="text-center">
                  <p>Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.</p>
                  <Link to="/login">
                    <Button className="mt-3" variant="primary">
                      Quay lại đăng nhập
                    </Button>
                  </Link>
                </div>
              ) : (
                <Form onSubmit={formik.handleSubmit}>
                  <FloatingLabel
                    className="mb-3"
                    controlId="email"
                    label="Email"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      {...formik.getFieldProps("email")}
                      isInvalid={formik.touched.email && !!formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <Button
                    type="submit"
                    className="w-100 text-light p-2 mt-3"
                    variant="primary"
                  >
                    GỬI YÊU CẦU ĐẶT LẠI MẬT KHẨU
                  </Button>

                  <div className="d-flex justify-content-center mt-3">
                    <Link to="/login">
                      <span>Quay lại đăng nhập</span>
                    </Link>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
