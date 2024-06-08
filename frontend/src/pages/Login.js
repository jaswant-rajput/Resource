import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PreventAuthFlow } from "../manageroutes/protectRoutes";
import { login } from "../frontend/src/ations/authActions";
import { useAuthStore } from "../store/store";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const setLoginFailed = useState(false);
  const setStateUser = useAuthStore((state) => state.setUser);
  const [userData, setUserData] = useState({
    email: "@gmail.com",
    password: "password",
    error: "",
    errorMessage: "",
  });

  const [serverMessage, setServerMessage] = useState("");

  const { error, errorMessage } = userData;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUserChange = (e) => {
    setServerMessage("");
    setUserData((prevData) => ({
      ...prevData,
      error: "",
      errorMessage: "",
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    if (userData.email === "" || userData.password === "") {
      setUserData({
        ...userData,
        error: "loginForm",
        errorMessage: "* Required Field",
      });
    } else {
      login({ email: userData.email, password: userData.password })
        .then((data) => {
          if (data === undefined) {
            return setServerMessage("Server Down, Contact Dev Cell");
          }
          if (data.status === false) {
            return setServerMessage(data.message);
          }

          if (data.status === true) {
            navigate("/dashboard");
          }
          setStateUser(data.user);
        })
        .catch((error) => {
          setLoginFailed(true);
          setUserData({
            ...userData,
            error: "loginForm",
            errorMessage: " Invalid Email Id or Password  ",
          });
          console.error("Login error:", error.message);
        });
    }
  };

  return (
    <PreventAuthFlow>
      <div className="container mt-5 col-md-6 col-11 shadow py-5 p-md-5">
        <h2 className="text-danger text-center ">LOGIN</h2>
        <form>
          <div className="mb-3">
            <TextField
              className="col-12"
              error={error === "loginForm" ? true : false}
              id="outlined-basic"
              label={error === "loginForm" ? `${errorMessage} ` : "Email Id"}
              value={userData.email}
              name="email"
              variant="outlined"
              onChange={(e) => handleUserChange(e)}
            />
          </div>

          <div className="mb-3">
            <TextField
              type={showPassword ? "text" : "password"}
              label={error === "loginForm" ? `${errorMessage} ` : "Password"}
              error={error === "loginForm" ? true : false}
              value={userData.password}
              name="password"
              onChange={(e) => handleUserChange(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </div>
        </form>
        <div className="text-center text-danger">
          {serverMessage === "" ? null : serverMessage}
        </div>
        <div className="d-grid  text-center mt-4 ">
          <button
            type="button"
            className="btn btn-danger px-4 text-center btn-lg"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
        {/* <div>
                <Link to="/forgot-password" className="mt-4 d-block text-center text-danger">Forgot Password</Link>
            </div> */}
      </div>
    </PreventAuthFlow>
  );
};

export default Login;
