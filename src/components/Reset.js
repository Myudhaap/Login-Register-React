import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import useFetch from "../hooks/fetch.hook";

import styles from "../styles/Username.module.css";

const Reset = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  // const [{ isLoading, apiData, status, serverError }] =
  //   useFetch("createResetSession");

  // useEffect(() => {
  //   if (status) {
  //   }
  // }, [isLoading, apiData, serverError]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: passwordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...</b>,
        error: <b>Could not reset...</b>,
      });

      resetPromise.then(() => navigate("/password"));
    },
  });

  // if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  // if (serverError)
  //   return <h1 className="text-xl text-red-500">{serverError}</h1>;
  // if (status && status !== 201)
  //   return <Navigate to={"/password"} replace={true}></Navigate>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="password"
                placeholder="new password"
                {...formik.getFieldProps("password")}
              />
              <input
                className={styles.textbox}
                type="password"
                placeholder="confirm password"
                {...formik.getFieldProps("confirm_password")}
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
