import { Button, Stack, TextField, Typography } from "@mui/material";
import "./signIn.scss";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="signIn">
      <form>
        <Stack spacing={2}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Sign in to account
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            id="filled-basic"
            type="email"
            label="Login or Email"
            variant="outlined"
          />
          {/* <TextField
            size="small"
            sx={{ width: "100%" }}
            id="filled-basic"
            label="Password"
            type="password"
            variant="outlined"
          /> */}

          <TextField
            size="small"
            sx={{ width: "100%" }}
            id="filled-basic"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button size="large" variant="contained">
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
