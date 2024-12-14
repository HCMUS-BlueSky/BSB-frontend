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
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

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

                <Button
                  onClick={() => login(email, password)}
                  className="w-100 text-light p-2"
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
