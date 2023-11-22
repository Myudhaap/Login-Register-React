import toast from "react-hot-toast";
import { authenticate } from "./helper";

// Validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User doesn't exist..!");
    }
  }

  return errors;
}

// Validate Passwordd
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

// Validate Username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }

  return error;
}

// Validate reset password
export async function passwordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_password) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

// validate register
export async function registerValidate(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  validateEmail(errors, values);

  return errors;
}

// Validate profile
export async function profileValidate(values) {
  const errors = validateEmail({}, values);
  return errors;
}

// Validate password
function passwordVerify(errors = {}, values) {
  const specialChars = /[`!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error("Password must be more than 4...!");
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character...!");
  }

  return errors;
}

// Validate email
function validateEmail(error = {}, values) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!values.email) {
    error.email = toast.error("Email required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong email...!");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }
}
