import React from "react";
import SignInForm from "../../../components/Forms/SignInForm";
import { loginUser } from "../../../services/authService";


export default function SignInSide() {
  const [errors, setError] = React.useState("");

  const login = async (data) => {
    setError("");
    try {
      await loginUser(data);
    } catch (err) {
      if (err.response) {
        if (err.response.data.message) {
          setError( err.response.data.message);
        } else {
          setError(
            "An error occurred during authentication! please try again later."
          );
        }
      } else if (err.message) {
        setError(err.message);
      }
    }
  };

  return (
    <React.Fragment>
      {/* <img src={logo} alt="logo" className={classes.logo} /> */}
      <SignInForm errorMsg={errors} getValue={(val) => login(val)} />
    </React.Fragment>
  );
}
