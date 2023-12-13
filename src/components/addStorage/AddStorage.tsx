import React, { useEffect, useState, useRef, useContext } from "react";
import "./addStorage.scss";

// mui:
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Select,
} from "@mui/material";

//react icons:
import { AiOutlineClose } from "react-icons/ai";
import { message } from "antd";
import { SparesContext } from "../../context/Spare";
import { StorageContext } from "../../context/Storage";

// type props:
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddStorage = (props: Props) => {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const [, setStorageList] = useContext(StorageContext);
  const [spareList] = useContext(SparesContext);

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
  const productNameRef = useRef<HTMLInputElement>(null);
  const spareListRef = useRef<any>(null);

  // submit-data:
  interface UserData {
    spare: number;
    is_booked: boolean;
  }

  const [userData, setUserData] = useState<UserData>({
    spare: 0,
    is_booked: false,
  });

  // handleChange:
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit:
  const handleSubmit = async () => {
    const refreshData = () =>
      fetch(`${url}/storage/list_or_create/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((account) => {
          setStorageList(account);
        })
        .catch((err) => console.log(err));
    try {
      const response = await fetch(`${url}/storage/list_or_create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        error();
      } else {
        success();
        setUserData({
          spare: 0,
          is_booked: false,
        });
        refreshData();
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
            sx={{ textTransform: "capitalize", marginBottom: "20px" }}
            variant="h4"
          >
            Создать новое Запчасть
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              disabled
              label="Забронировано"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={productNameRef}
              value={userData?.is_booked}
              onChange={handleChange}
              name="name"
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-5">
                Запасное имя
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-5"
                id="demo-simple-select-5"
                inputRef={spareListRef}
                value={userData.spare}
                label=" Запасное имя"
                onChange={handleChange}
                name="spare"
              >
                {spareList?.map((item: any) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
              отправлять
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AddStorage;
