import "./signUp.scss";

// mui compoents:
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

// route:
import { Link } from "react-router-dom";

// mui icons additional:
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

// react-icons:
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  return (
    <div className="signUp">
      <form>
        <Stack spacing={2}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Join Ninja Devs!
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            id="filled-basic"
            type="email"
            label="Login or Email"
            variant="outlined"
          />

          <TextField
            size="small"
            sx={{ width: "100%" }}
            id="filled-basic"
            label="Password"
            type={showPassword1 ? "text" : "password"}
            variant="outlined"
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
            size="small"
            sx={{ width: "100%" }}
            id="filled-basic"
            label="Confirm Password"
            type={showPassword2 ? "text" : "password"}
            variant="outlined"
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

          <Button size="large" variant="contained">
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
