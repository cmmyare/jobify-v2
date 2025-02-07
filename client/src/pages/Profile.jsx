//import React from 'react'
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import customFetch from "../utilits/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  // console.log("formdataha:... ", formData);
  const file = formData.get("avatar");
  // console.log("formdataha:... ", file);
  if (file && file.size > 500000) {
    toast.error("file size is large");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};
const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, lacation } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>

        <div className="form-center">
          {/* Display the avatar if it exists
          {avatar && (
            <img src={avatar} alt="User Avatar" className="avatar-img" />
          )} */}

          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>

          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            labelText="Last Name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={lacation} />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
