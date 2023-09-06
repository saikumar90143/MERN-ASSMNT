import React, { useEffect, useState } from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router";
import { LogOut, LoginSlice } from "../Redux/ReduxSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
function Signin() {
  const dispatch = useDispatch();

  const { error, loading, user } = useSelector((state) => state.user);
  console.log("user: ", user);

  const token = user?.token;
  console.log("token: ", token);

  if (token) {
    const DecodedToken = decode(token);
    if (DecodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(LogOut());
    }
  }

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formValue;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const SignInData = { email, password };
    dispatch(LoginSlice(SignInData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="mt-5">
      <MDBTypography variant="h3" className="text-center">
        Sign In
      </MDBTypography>
      <form className="w-50 m-auto" onSubmit={handleSubmit} method="post">
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
        <span className="text-danger text-center">{error}</span>
        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-center">
            <MDBCheckbox
              id="form1Example3"
              label="Remember me"
              defaultChecked
            />
          </MDBCol>
          <MDBCol>
            <a href="/signup">not regestered?click here.</a>
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit" block>
          Sign In<span>{loading && "loading..."}</span>
        </MDBBtn>
      </form>
    </div>
  );
}

export default Signin;
