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
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { login } = useAuth();
  const [recaptchaToken, setRecaptchaToken] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      if (!recaptchaToken) {
        alert("Vui lòng xác nhận reCAPTCHA!");
        return;
      }
      await login(values.email, values.password, recaptchaToken);
      setRecaptchaToken(null);
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
              <h3 className="w-100 text-center mt-3">Đăng nhập</h3>
            </Card.Title>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <FloatingLabel className="mb-3" controlId="email" label="Email">
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

                <FloatingLabel
                  className="mb-3"
                  controlId="password"
                  label="Mật khẩu"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && !!formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <ReCAPTCHA
                  sitekey="6LeHbaEqAAAAAPrW2icmbu9Kz2RNuufAAhexE9wi"
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />

                <Button
                  type="submit"
                  className="w-100 text-light p-2 mt-3"
                  variant="primary"
                >
                  ĐĂNG NHẬP
                </Button>

                <div className="d-flex justify-content-end mt-3">
                  <Link to="/reset-password">
                    <span>Đặt lại mật khẩu</span>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
