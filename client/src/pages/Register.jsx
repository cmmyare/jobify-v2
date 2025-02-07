//import React from 'react'

import { Link, redirect, useNavigation, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
import customFetch from "../utilits/customFetch";
import { toast } from "react-toastify";
//import { formToJSON } from "axios";
// register function

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registed Succesfully");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// const handle = async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const data = Object.fromEntries(formData);
//   console.log(data);
//   try {
//     await customFetch.post("/auth/register", data);
//   } catch (error) {
//     return console.log(error);
//   }
// };

const Register = () => {
  // navigation
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmiting = navigation.state === "submitting";
  console.log(FormRow);
  // const Onsubmti = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   console.log(formData);
  //   const data = Object.fromEntries(formData);
  //   console.log(data);
  // };
  return (
    <Wrapper>
      {/* onSubmit={handle} */}
      <Form method="Post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />
        <FormRow type="text" name="lacation" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <button type="submit" className="btn btn-block" disabled={isSubmiting}>
          {isSubmiting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Alrady a member?
          <Link to="/login" className="member-btn">
            login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
