import api from "../axios";

export const authenticate = async (email, password, recaptchaToken) => {
  const response = await api.post(
    "/auth/login", // Endpoint API
    { email, password }, // Payload gửi qua body
    {
      headers: {
        recaptcha: recaptchaToken, // Thêm token reCAPTCHA vào header
      },
    }
  );
  return response;
};
