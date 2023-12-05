import React, { useEffect, useState, useRef, useContext } from "react";
import "./addSpare.scss";

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
import { SparesContext } from "../../context/Spare";
import { message } from "antd";

// type props:
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddSpare = (props: Props) => {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const [, setSpareList] = useContext(SparesContext);

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
      content: `Проверьте правильность заполнения информации!`,
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
  const spareNameRef = useRef<HTMLInputElement>(null);
  const spareFirstPriceRef = useRef<HTMLInputElement>(null);
  const spareLastPriceRef = useRef<HTMLInputElement>(null);

  // submit-data:
  interface UserData {
    name: string;
    first_price: string;
    last_price: string;
  }

  const [userData, setUserData] = useState<UserData>({
    name: "",
    first_price: "",
    last_price: "",
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
      fetch(`${url}/product/spare_list_with_id`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((spare) => {
          setSpareList(spare);
        })
        .catch((err) => console.log(err));

    try {
      const response = await fetch(`${url}/product/spare_create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        error();
        console.error("HTTP 400 xatoligi:", errorData);
      } else {
        // Yangi ma'lumotlarni olish
        success();
        refreshData();
        setUserData({
          name: "",
          first_price: "",
          last_price: "",
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
          <Typography
            sx={{ textTransform: "capitalize", mb: "20px" }}
            variant="h4"
          >
            Создать новый {props.slug}
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              label="Имя"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={spareNameRef}
              value={userData?.name}
              onChange={handleChange}
              name="name"
            />

            <TextField
              label="Первая цена"
              sx={{ width: "100%" }}
              variant="outlined"
              type="number"
              inputRef={spareFirstPriceRef}
              value={userData?.first_price}
              onChange={handleChange}
              name="first_price"
            />

            <TextField
              type="number"
              label="Последняя цена"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={spareLastPriceRef}
              value={userData?.last_price}
              onChange={handleChange}
              name="last_price"
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

export default AddSpare;
