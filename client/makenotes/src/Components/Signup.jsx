import React, { useEffect, useState } from "react";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import styled from "styled-components";
import { SignUpSlice } from "../Redux/ReduxSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, error, loading } = useSelector((state) => state.user);
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formValue;
  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const SignupData = { username, email, password };
      if (username && email && password) {
        setIsSignUp(true);
      }
      dispatch(SignUpSlice(SignupData));
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (isSignUp) {
      navigate("/signin");
    }
  }, [isSignUp]);

  return (
    <div>
      <h2 className="text-center">SIGN UP FORM</h2>
      <form className="w-50 m-auto" onSubmit={handleSubmit} method="post">
        <MDBInput
          className="mb-4"
          type="userName"
          id="form1Example1"
          label="UserName"
          name="username"
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="email"
          id="form1Example1"
          label="Email address"
          name="email"
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form1Example2"
          label="Password"
          name="password"
          onChange={handleChange}
        />

        <span className="text-danger">{error}</span>

        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-center">
            <MDBCheckbox
              id="form1Example3"
              label="Remember me"
              defaultChecked
            />
          </MDBCol>
          <MDBCol>
            <a href="/signin">Already a user? click here.</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type="submit" block>
          Sign Up &nbsp;
          <span>{loading && "loading..."}</span>
        </MDBBtn>
      </form>
    </div>
  );
}
const Wrapper = styled.div``;
