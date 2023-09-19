import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  // this will connect frontend with backend to actually create an user by sending data stored in body to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/"); // this will redirect the user to homepage when login is successful
    }
  };

  // onChange is required so that user can fill input in signup form, the above code will prevent any change as credentials are set "" by default
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        className="container"
        style={{
          height: "80vh",
          // background: "linear-gradient(to right ,black, #198754 ,black)",
        }}
      >
        <div className="row justify-content-center ">
          <div className="col-md-6 ">
            <h1 className="text-center my-4">FoodNow Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control bg-white"
                  id="email"
                  name="email"
                  value={credentials.email}
                  placeholder="Enter your email address"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control bg-white"
                  id="password"
                  name="password"
                  value={credentials.password}
                  placeholder="Choose a password"
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-info btn-block m-2">
                Login
              </button>
              <Link to="/createuser" className="m-3 btn btn-info">
                Create Account!
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
