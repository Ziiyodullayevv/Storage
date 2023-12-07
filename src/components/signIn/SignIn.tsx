import { Button, Stack, TextField, Typography } from "@mui/material";
import "./signIn.scss";

// react-router-dom:
import { Link, useNavigate } from "react-router-dom";

// mui-components:
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

// react-icons:
import { useRef, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const SignIn: React.FC = () => {
  interface UserData {
    username: string;
    password: string;
  }
  // navigate:
  const navigate = useNavigate();
  const url = import.meta.env.VITE_KEY;

  // password-icon open-close:
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // refs:
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // login:
  const handleSubmit = () => {
    fetch(`${url}/account/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res?.success) {
          localStorage.setItem("token", res?.data?.tokens?.access);
          navigate("/");
        } else {
          alert("Login yoki parol xato!");
        }
      });
  };

  return (
    <div className="signIn">
      <form>
        <Stack spacing={2}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Sign in to account
          </Typography>
          <TextField
            size="medium"
            sx={{ width: "100%" }}
            id="filled-basic"
            type="text"
            label="username"
            name="username"
            variant="outlined"
            value={userData.username}
            onChange={handleChange}
            inputRef={usernameRef}
          />

          <TextField
            size="medium"
            sx={{ width: "100%" }}
            id="filled-basic"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            name="password"
            value={userData.password}
            onChange={handleChange}
            inputRef={passwordRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            onClick={handleSubmit}
            size="large"
            sx={{
              padding: "12px 0",
              boxShadow: "none",
              backgroundColor: "#2F89E3",
            }}
            variant="contained"
          >
            Sign In
          </Button>
          <div className="toSignUp">
            <Typography sx={{ color: "gray" }} variant="body1">
              Don't have an account?
            </Typography>
            <Link style={{ color: "#2F89E3" }} to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default SignIn;
