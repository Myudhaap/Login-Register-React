import axios from "axios";
import jwt_decode from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Make API Request

// get username from token
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

// authenticate function
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (err) {
    return { error: "Username dosen't exist...!" };
  }
}

// get User Details
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (err) {
    return { error: "Password doesn't macth...!" };
  }
}

// Register user function
export async function registerUser(credentials) {
  try {
    const {
      data: { message },
      status,
    } = await axios.post("/api/register", credentials);

    const { username, email } = credentials;

    // send mail
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: message,
      });
    }

    return Promise.resolve(message);
  } catch (err) {
    return Promise.reject({ err });
  }
}

// Login function
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (err) {
    return Promise.reject({ error: "Password doesn't match...!" });
  }
}

// Update user function
export async function updateUser(response) {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.put("/api/updateUser", response, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return Promise.resolve({ data });
  } catch (err) {
    return Promise.reject({ error: "Couldn't update profile" });
  }
}

// generate OTP
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    // send mail with the OTP
    if (status === 201) {
      const {
        data: { email },
      } = await getUser({ username });
      const text = `Your password recovery OTP is ${code}.Verify and recover yout password.`;
      await axios.post("api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (err) {
    return Promise.reject({ err });
  }
}

// Verify OTP
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (err) {
    return Promise.reject(err);
  }
}

// Reset Password
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (err) {
    return Promise.reject({ err });
  }
}
