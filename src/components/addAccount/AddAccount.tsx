import React, { useEffect, useState, useRef, useContext } from "react";
import "./addAccount.scss";

// mui:
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

//react icons:
import { AiOutlineClose } from "react-icons/ai";
import { AccountContext } from "../../context/Account";
import { message } from "antd";

// type props:
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddAccount = (props: Props) => {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const [, setAccountList] = useContext(AccountContext);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Данные успешно добавлены!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: `Данные уже существуют или поле не заполнено`,
    });
  };

  // transition effect:
  useEffect(() => {
    const enableScroll = () => {
      document.body.style.overflow = "visible";
    };

    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    if (props.open) {
      disableScroll();
    } else {
      enableScroll();
    }

    // Component unmount bo'lganda ishga tushiriladi
    return () => {
      enableScroll();
    };
  }, [props.open]);

  // refs:
  const clientUserNameRef = useRef<HTMLInputElement>(null);
  const clientEmailRef = useRef<HTMLInputElement>(null);
  const clinetFullNameRef = useRef<HTMLInputElement>(null);
  const clientPhoneNumber = useRef<HTMLInputElement>(null);

  // submit-data:
  interface UserData {
    username: string;
    email: string;
    full_name: string;
    phone_number: string;
  }

  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    full_name: "",
    phone_number: "",
  });

  // handleChange:
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit:
  const handleSubmit = async () => {
    const refreshData = () =>
      fetch(`${url}/account/client/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((account) => {
          setAccountList(account);
        })
        .catch((err) => console.log(err));

    try {
      const response = await fetch(`${url}/account/client/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      // 400 xatoligi tekshirish
      if (!response.ok) {
        const errorData = await response.json();
        error();
        console.error("HTTP 400 xatoligi:", errorData);
      } else {
        // Yangi ma'lumotlarni olish;
        success();
        refreshData();

        // Malumotlarni yangilash
        setUserData({
          username: "",
          email: "",
          full_name: "",
          phone_number: "",
        });
      }
    } catch (error) {
      console.error("Ma'lumotni o'chirishda xatolik:", error);
    }
  };

  return (
    <div className={`add ${props.open ? "w-100" : null}`}>
      {contextHolder}
      <div className={`modal ${props.open ? "show" : "close"}`}>
        <IconButton
          sx={{ position: "absolute", right: "10px", top: "10px" }}
          color="inherit"
          onClick={() => props.setOpen(false)}
        >
          <AiOutlineClose />
        </IconButton>
        <div className="modalList">
          <Typography sx={{ marginBottom: "20px" }} variant="h4">
            Cоздать нового {props.slug}
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              label="Имя пользователя"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={clientUserNameRef}
              value={userData?.username}
              onChange={handleChange}
              name="username"
            />

            <TextField
              label="Электронная почта"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={clientEmailRef}
              value={userData.email}
              onChange={handleChange}
              name="email"
            />

            <TextField
              label="Полное имя"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={clinetFullNameRef}
              value={userData.full_name}
              onChange={handleChange}
              name="full_name"
            />

            <TextField
              label="Номер телефона"
              type="tel"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={clientPhoneNumber}
              value={userData.phone_number}
              onChange={handleChange}
              name="phone_number"
            />

            <Button
              onClick={() => {
                props.setOpen(false);
                handleSubmit();
              }}
              sx={{
                backgroundColor: "#2F89E3",
                boxShadow: "none",
                padding: "10px",
              }}
              size="large"
              variant="contained"
            >
              Oтправлять
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
