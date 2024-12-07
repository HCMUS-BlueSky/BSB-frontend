import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col xs={8} md={4} className="mx-auto">
          <Card className="p-4">
            <Card.Title>
              <h3 className="text-center mt-3">Login</h3>
            </Card.Title>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button className="w-100" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>

              <div className="mt-2 d-flex justify-content-center gap-2">
                <p className="mb-2">Don't have an account?</p>
                <Link to={"/signup"}>Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
