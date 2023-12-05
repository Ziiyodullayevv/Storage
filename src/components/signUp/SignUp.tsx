import "./signUp.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// snackbar icons:
import IconButton from "@mui/material/IconButton";
import { message } from "antd";

interface UserData {
  username: string;
  phone_number: string;
  full_name: string;
  email: string;
  password: string;
  password2: string;
  role: number;
}

const SignUp: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  // data:
  const [data, setData] = useState(null);
  // Password icon:
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  // refs:
  const usernameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  // submit-data:
  const [userData, setUserData] = useState<UserData>({
    username: "",
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    password2: "",
    role: 0,
  });

  // handleChange:
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit:
  const handleSubmit = () => {
    console.log("data", userData);

    fetch("http://127.0.0.1:8000/account/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        if (res?.success) {
          success();
          localStorage.setItem("token", res?.data?.tokens?.access);
          navigate("/");
          success();
        } else {
          error();
        }
      })
      .catch((err) => {
        console.log(err);
        error();
      });
  };

  return (
    <div className="signUp">
      <form>
        <Stack spacing={2}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Join Ninja Devs!
          </Typography>
          <TextField
            required
            sx={{ width: "100%" }}
            id="filled-basic1"
            type="text"
            label="Username"
            variant="outlined"
            value={userData?.username}
            onChange={handleChange}
            inputRef={usernameRef}
            name="username"
            error={data?.username[0]}
            helperText={data?.username[0]}
          />

          <TextField
            required
            sx={{ width: "100%" }}
            id="filled-basic1"
            type="text"
            label="Full Name"
            variant="outlined"
            value={userData?.full_name}
            onChange={handleChange}
            inputRef={fullNameRef}
            name="full_name"
            error={data?.full_name[0]}
            helperText={data?.full_name[0]}
          />
          <TextField
            sx={{ width: "100%" }}
            id="filled-basic2"
            type="email"
            label="Email"
            variant="outlined"
            value={userData.email}
            onChange={handleChange}
            inputRef={emailRef}
            name="email"
          />
          <TextField
            sx={{ width: "100%" }}
            id="filled-basic3"
            type="tel"
            label="Phone Number"
            variant="outlined"
            value={userData.phone_number}
            onChange={handleChange}
            inputRef={phoneNumberRef}
            name="phone_number"
          />
          <TextField
            sx={{ width: "100%" }}
            required
            id="filled-basic4"
            label="Password"
            type={showPassword1 ? "text" : "password"}
            variant="outlined"
            value={userData.password}
            onChange={handleChange}
            inputRef={passwordRef}
            error={data?.password[0]}
            helperText={data?.password[0]}
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleTogglePassword1}
                    edge="end"
                  >
                    {showPassword1 ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            sx={{ width: "100%" }}
            id="filled-basic5"
            label="Confirm Password"
            type={showPassword2 ? "text" : "password"}
            variant="outlined"
            value={userData.password2}
            onChange={handleChange}
            inputRef={password2Ref}
            name="password2"
            error={data?.password[0]}
            helperText={data?.password[0]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleTogglePassword2}
                    edge="end"
                  >
                    {showPassword2 ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="outlined">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              label="Role"
              labelId="role-label"
              name="role"
              value={userData.role}
              onChange={handleChange}
              inputRef={roleRef}
            >
              <MenuItem value={0}>Manager</MenuItem>
              <MenuItem value={1}>Employee</MenuItem>
            </Select>
          </FormControl>
          {contextHolder}
          <Button
            sx={{ padding: "12px", boxShadow: "none", background: "#2F89E3" }}
            onClick={handleSubmit}
            size="large"
            variant="contained"
          >
            Sign Up
          </Button>
          <div className="toSignUp">
            <Typography sx={{ color: "gray" }} variant="body1">
              Don't have an account?
            </Typography>
            <Link style={{ color: "#2F89E3" }} to={"/signin"}>
              Sign In
            </Link>
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default SignUp;
