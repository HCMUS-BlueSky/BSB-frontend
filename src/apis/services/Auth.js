import api from "../axios";

export const authenticate = async (email, password, recaptchaToken) => {
  const response = await api.post(
    "/auth/login",
    { email, password },
    {
      headers: {
        recaptcha: recaptchaToken,
      },
      withCredentials: true
    }
  );
  return response.data;
};


export const changePassword = async (oldPassword, newPassword, token) => {
  const response = await api.put(
    "/auth/change-password", 
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const forgetPassword = async (email) => {
  const response = await api.post(
    "/auth/forget-password", 
    { email},

  );
  return response.data;
};