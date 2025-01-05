import React, { useReducer } from "react";
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

const ACTIONS = {
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  SET_RECAPTCHA: "SET_RECAPTCHA",
  SET_TOUCHED: "SET_TOUCHED",
  RESET_FORM: "RESET_FORM",
};

const initialState = {
  email: {
    value: "",
    error: "",
    touched: false,
  },
  password: {
    value: "",
    error: "",
    touched: false,
  },
  recaptchaToken: null,
};

const validateEmail = (email) => {
  if (!email) return "Vui lòng nhập email";
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Email không hợp lệ";
  }
  return "";
};

const validatePassword = (password) => {
  if (!password) return "Vui lòng nhập mật khẩu";
  return "";
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_EMAIL:
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload,
          error: validateEmail(action.payload),
        },
      };

    case ACTIONS.SET_PASSWORD:
      return {
        ...state,
        password: {
          ...state.password,
          value: action.payload,
          error: validatePassword(action.payload),
        },
      };

    case ACTIONS.SET_RECAPTCHA:
      return {
        ...state,
        recaptchaToken: action.payload,
      };

    case ACTIONS.SET_TOUCHED:
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          touched: true,
        },
      };

    case ACTIONS.RESET_FORM:
      return initialState;

    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: ACTIONS.SET_TOUCHED, field: "email" });
    dispatch({ type: ACTIONS.SET_TOUCHED, field: "password" });

    if (!state.recaptchaToken) {
      alert("Vui lòng xác nhận reCAPTCHA!");
      return;
    }

    if (!state.email.error && !state.password.error) {
      await login(
        state.email.value,
        state.password.value,
        state.recaptchaToken
      );
      dispatch({ type: ACTIONS.SET_RECAPTCHA, payload: null });
    }
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
              <Form onSubmit={handleSubmit}>
                <FloatingLabel className="mb-3" controlId="email" label="Email">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={state.email.value}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.SET_EMAIL,
                        payload: e.target.value,
                      })
                    }
                    onBlur={() =>
                      dispatch({
                        type: ACTIONS.SET_TOUCHED,
                        field: "email",
                      })
                    }
                    isInvalid={state.email.touched && !!state.email.error}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.email.error}
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
                    value={state.password.value}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.SET_PASSWORD,
                        payload: e.target.value,
                      })
                    }
                    onBlur={() =>
                      dispatch({
                        type: ACTIONS.SET_TOUCHED,
                        field: "password",
                      })
                    }
                    isInvalid={state.password.touched && !!state.password.error}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.password.error}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <ReCAPTCHA
                  sitekey="6LeHbaEqAAAAAPrW2icmbu9Kz2RNuufAAhexE9wi"
                  onChange={(token) =>{
                    console.log(token);
                    dispatch({
                      type: ACTIONS.SET_RECAPTCHA,
                      payload: token,
                    })}
                  }
                  onExpired={() =>
                    dispatch({
                      type: ACTIONS.SET_RECAPTCHA,
                      payload: null,
                    })
                  }
                />

                <Button
                  type="submit"
                  className="w-100 text-light p-2 mt-3"
                  variant="primary"
                >
                  ĐĂNG NHẬP
                </Button>

                <div className="d-flex justify-content-end mt-3">
                  <Link to="/forgot-password">
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
