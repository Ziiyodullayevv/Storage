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
import { message } from "antd";

const SignIn = () => {
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

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      content: "пароль или имя пользователя введены неверно!",
    });
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
        if (res?.success) {
          localStorage.setItem("token", res?.data?.tokens?.access);
          success();
          navigate("/");
        } else {
          error();
        }
      });
  };

  return (
    <div className="signIn">
      {contextHolder}
      <form>
        <Stack spacing={2}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            Войдите в аккаунт
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
            Войти
          </Button>
          <div className="toSignUp">
            <Typography sx={{ color: "gray" }} variant="body1">
              У вас нет учетной записи?
            </Typography>
            <Link style={{ color: "#2F89E3" }} to={"/signup"}>
              Зарегистрироваться
            </Link>
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default SignIn;
