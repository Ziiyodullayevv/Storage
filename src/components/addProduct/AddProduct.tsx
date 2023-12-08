import React, { useEffect, useState, useRef, useContext } from "react";
import "./addProduct.scss";

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
import { ProductContext } from "../../context/Product";
import { AccountContext } from "../../context/Account";
import { message } from "antd";

// type props:
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddProduct = (props: Props) => {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const [, setAccountList] = useContext(ProductContext);
  const [productList] = useContext(AccountContext);

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
  const productImeiRef = useRef<HTMLInputElement>(null);
  const productNameRef = useRef<HTMLInputElement>(null);
  const productClientRef = useRef<HTMLInputElement>(null);

  // submit-data:
  interface UserData {
    client: number;
    name: string;
    imei: string;
  }

  const [userData, setUserData] = useState<UserData>({
    client: 0,
    name: "",
    imei: "",
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
      fetch(`${url}/product/device_list_or_create/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((account) => {
          setAccountList(account);
        })
        .catch((err) => console.log(err));
    try {
      const response = await fetch(`${url}/product/device_list_or_create/`, {
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
          client: 0,
          name: "",
          imei: "",
        });
        refreshData();
      }
    } catch (error) {
      console.error("Ma'lumotni o'chirishda xatolik:", error);
    }
  };
  console.log(productList, "test");

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
            Создать новый продукт
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              label="Имя"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={productNameRef}
              value={userData?.name}
              onChange={handleChange}
              name="name"
            />

            <TextField
              label="IMEI"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={productImeiRef}
              value={userData?.imei}
              onChange={handleChange}
              name="imei"
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-5">Клиент</InputLabel>
              <Select
                labelId="demo-simple-select-label-5"
                id="demo-simple-select-5"
                inputRef={productClientRef}
                value={userData.client}
                label="Клиент"
                onChange={handleChange}
                name="client"
              >
                {productList?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item?.username}
                    </MenuItem>
                  );
                })}
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

export default AddProduct;
