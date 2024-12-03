import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import gLogo from "/images/google.png";
import mailLogo from "/images/emailIcon.jpg";
import closeBtn from "/images/closeBtn.jpg";

import loginCss from "./Login.module.css";
import EnterOTP from "../../Auth/EnterOTP/EnterOTP";

let Login = ({ setAuth, setLoggedIn }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false); // Toggle between phone and email
  const [otpModal, setOTPModal] = useState(false);
  const [error, setError] = useState("");

  // Function to send OTP
  const sendOtp = async () => {
    try {
      const endpoint = isEmail ? "send-email-otp" : "send-phone-otp";
      const payload = isEmail ? { email } : { phone };

      const response = await axios.post(`http://localhost:4000/api/${endpoint}`, payload);

      alert(response.data.message); // Notify user of success
      setOTPModal(true); // Open OTP modal
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response);
        setError(error.response.data.message || "An unknown error occurred.");
      } else if (error.request) {
        console.error("Error Request:", error.request);
        setError("Network error. Please check your internet connection and try again.");
      } else {
        console.error("Error Message:", error.message);
        setError(error.message || "An unexpected error occurred.");
      }
    }
  };

  // Function to verify OTP
  const verifyOtp = async (otp) => {
    try {
      const endpoint = isEmail ? "verify-email-otp" : "verify-otp";
      const payload = isEmail ? { email, otp } : { phone, otp };

      const response = await axios.post(`http://localhost:4000/api/${endpoint}`, payload);

      alert(response.data.message); // Notify user of success
      setLoggedIn(true); // Log user in
      setAuth({ closed: true, login: false, signup: false }); // Close modal
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const googlesignin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  let loginDiv = !otpModal ? (
    <div className={loginCss.outerDiv}>
      <div className={loginCss.modal}>
        <div className={loginCss.header}>
          <span className={loginCss.ttl}>Login</span>
          <span
            className={loginCss.closeBtn}
            onClick={() => setAuth({ closed: true, login: false, signup: false })}
          >
            <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
          </span>
        </div>
        <div className={loginCss.lgBox}>
          {!isEmail ? (
            <input
              className={loginCss.phoneInp}
              type="tel"
              placeholder="Phone number ..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <input
              className={loginCss.phoneInp}
              type="email"
              placeholder="Email address ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <button
            className={
              (isEmail && email.includes("@")) || (!isEmail && phone.length === 10)
                ? [loginCss.btn, loginCss.Sbtn].join(" ")
                : loginCss.btn
            }
            onClick={() =>
              (isEmail && email.includes("@")) || (!isEmail && phone.length === 10)
                ? sendOtp()
                : ""
            }
          >
            Send OTP
          </button>
          {error && <div className={loginCss.error}>{error}</div>}
        </div>
        <div className={loginCss.orBreak}>
          <span className={loginCss.orBreakText}>or</span>
        </div>
        <div className={loginCss.socialSignupBox}>
          <img className={loginCss.icon} src={mailLogo} alt="email signup" />
          <span onClick={() => setIsEmail(!isEmail)}>
            Continue with {isEmail ? "Phone" : "Email"}
          </span>
        </div>
        <div className={loginCss.socialSignupBox}>
          <img className={loginCss.icon} src={gLogo} alt="google signup" />
          <a href="http://localhost:4000/auth/google"> Continue with Google</a>
        </div>
        <hr className={loginCss.break} />
        <div className={loginCss.newToZomato}>
          New to Zomato?{" "}
          <div
            className={loginCss.createAcc}
            onClick={() => setAuth({ closed: false, login: false, signup: true })}
          >
            Create Account
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EnterOTP
      setModal={setOTPModal}
      setLoggedIn={setLoggedIn}
      setAuth={setAuth}
      verifyOtp={verifyOtp} // Pass verifyOtp to EnterOTP
    />
  );

  return createPortal(loginDiv, document.getElementById("modal"));
};

export default Login;
