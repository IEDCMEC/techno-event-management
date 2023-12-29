import axios from 'axios';

export const signupService = async ({ firstName, lastName, email, password }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/auth/signup',
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        validateStatus: () => true,
      },
    );

    if (res.status === 201) {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/auth/login',
      {
        email,
        password,
      },
      {
        validateStatus: () => true,
      },
    );

    if (res.status === 200) {
      localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN, res?.data?.token);
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const logoutService = async () => {
  try {
    localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_TOKEN);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
