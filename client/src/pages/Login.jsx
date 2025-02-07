//import React from 'react'
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
import customFetch from "../utilits/customFetch";
import { useNavigate } from "react-router-dom";

// official user
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // Password length
  const errors = { msg: "" };
  if (data.password.length < 3) {
    errors.msg = "password is too short";
    return errors;
  }
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successfullly");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    // errors.msg = error?.response?.data?.msg
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  // demo user
  const loginDemoUser = async () => {
    const data = {
      email: "sab@gmail.com",
      password: "12345678",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  // const error = useRouteError();
  const errors = useActionData();

  const navigationSubmi = useNavigation().state === "submitting";

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button
          type="submit"
          className="btn btn-block"
          disabled={navigationSubmi}
        >
          {navigationSubmi ? "Login.." : "Login"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
