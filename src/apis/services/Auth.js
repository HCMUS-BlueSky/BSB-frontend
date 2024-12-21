import api from "../axios";

export const authenticate = async (email, password, recaptchaToken) => {
  console.log(recaptchaToken)
  const response = await api.post(
    "/auth/login",
    { email, password },
    {
      headers: {
        recaptcha: recaptchaToken,
      },
    }
  );
  return response.data;
};
