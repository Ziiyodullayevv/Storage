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

// type props:
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddProduct = (props: Props) => {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const [_, setAccountList] = useContext(ProductContext);
  const [productList] = useContext(AccountContext);

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
  const productClientRef = +useRef<HTMLInputElement>(null);

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
      fetch(`${url}/product/device_list_or_create/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((account) => {
          setAccountList(account);
        })
        .catch((err) => console.log(err));
    try {
      await fetch(`${url}/product/device_list_or_create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      // Yangi ma'lumotlarni olish
      refreshData();
    } catch (error) {
      console.error("Ma'lumotni o'chirishda xatolik:", error);
    }
  };

  return (
    <div className={`add ${props.open ? "w-100" : null}`}>
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
            Create New {props.slug}
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2}>
            <TextField
              label="Name"
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
              <InputLabel id="demo-simple-select-label-5">Client</InputLabel>
              <Select
                labelId="demo-simple-select-label-5"
                id="demo-simple-select-5"
                inputRef={productClientRef}
                value={userData.client}
                label="Manager"
                onChange={handleChange}
                name="client"
              >
                {productList?.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item?.username}
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
              Submit
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
