import React, { useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    console.log('token: ', recaptchaToken)
    if (!recaptchaToken) {
      alert("Vui lòng xác nhận reCAPTCHA!");
      return;
    }

    await login(email, password, recaptchaToken);
    setRecaptchaToken(null); // Reset token sau khi gửi
  };

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
              <Form>
                <FloatingLabel className="mb-3" controlId="email" label="Email">
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                  />
                </FloatingLabel>

                <FloatingLabel
                  className="mb-3"
                  controlId="password"
                  label="Mật khẩu"
                >
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                <ReCAPTCHA
                  sitekey="6Le7SqEqAAAAAPj3N2kxV5yVxa7LSVPE5wHuVML-"

                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />

                <Button
                  onClick={handleLogin}
                  className="w-100 text-light p-2 mt-3"
                  variant="primary"
                  type="button"
                >
                  ĐĂNG NHẬP
                </Button>

                <div className="d-flex justify-content-between mt-3">
                  <Link>
                    <span>Đổi mật khẩu</span>
                  </Link>

                  <Link>
                    <span>Quên mật khẩu</span>
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
