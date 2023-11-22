import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import styles from "../styles/Username.module.css";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

const Recovery = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState("");

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP");
    });
  }, []);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify successfully");
        return navigate("/reset");
      }
    } catch (err) {
      return toast.error("Wrong OTP! check email again!");
    }
  }

  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been send on your email!</b>,
      error: <b>Couldn't send OTP!</b>,
    });

    sendPromise.then((OTP) => console.log(OTP));
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm tex-left text-gray-500">
                  ENter 6 digit OTP sent your email address.
                </span>
                <input
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP??{" "}
                <button
                  className="text-red-500"
                  type="button"
                  onClick={resendOTP}
                >
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
