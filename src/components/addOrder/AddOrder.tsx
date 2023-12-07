/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef, useContext } from "react";
import "./addOrder.scss";
import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { AccountContext } from "../../context/Account";
import { ProductContext } from "../../context/Product";
import { StorageContext } from "../../context/Storage";
import { OrderContext } from "../../context/Order";
import { ChangeEvent } from "react";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddOrder = (props: Props) => {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [, setOrderList] = useContext(OrderContext);
  const [client] = useContext(AccountContext);
  const [device] = useContext(ProductContext);
  const [storage, setStorage] = useContext(StorageContext);

  const data = storage.filter((item: any) => !item?.is_booked);

  useEffect(() => {}, []);

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

    return () => {
      enableScroll();
    };
  }, [props.open]);

  const clientRef = useRef<HTMLSelectElement>(null);
  const deviceRef = useRef<HTMLSelectElement>(null);
  const problemDescriptionRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  interface UserData {
    client: number;
    device: number;
    storage: number[];
    deadline: string;
    problem_description: string;
    price: string;
  }

  const [userData, setUserData] = useState<UserData>({
    client: client && client.length > 0 ? client[0]?.id || 0 : 0,
    device: 0,
    storage: [],
    deadline: "",
    problem_description: "",
    price: "",
  });

  const handleChange = (
    event: SelectChangeEvent<number | string> | ChangeEvent<HTMLInputElement>,
    _child: React.ReactNode
  ) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const fixedOptions: { id: number; spare: string }[] = [];
  const [value, setValue] = useState<typeof fixedOptions>(fixedOptions);

  const arr = value?.map((item) => item?.id || 0);

  const handleSubmit = async () => {
    try {
      await createOrder();
      refreshData();
      refreshOrder();
      resetForm();
    } catch (error) {
      console.error("Error creating order:", error);
      // Provide user feedback, e.g., show a notification
    }
  };

  const createOrder = async () => {
    await fetch(`${url}/order/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...userData, storage: arr }),
    });
  };

  const refreshData = () => {
    fetch(`${url}/order/list/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((tasks) => {
        setOrderList(tasks);
      })
      .catch((err) => console.log(err));
  };

  const refreshOrder = () => {
    fetch(`${url}/storage/list_or_create/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((tasks) => {
        setStorage(tasks);
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setUserData({
      client: client && client.length > 0 ? client[0]?.id || 0 : 0,
      device: 0,
      storage: [],
      deadline: "",
      problem_description: "",
      price: "",
    });
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-1">Client</InputLabel>
              <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select-1"
                inputRef={clientRef}
                value={userData?.client}
                label="Client"
                onChange={handleChange}
                name="client"
              >
                {client?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-2">Device</InputLabel>
              <Select
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                label="Employee"
                value={userData.device}
                inputRef={deviceRef}
                onChange={handleChange}
                name="device"
              >
                {device?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Autocomplete
              multiple
              id="fixed-tags-demo"
              value={value}
              onChange={(_, newValue) => {
                setValue([
                  ...fixedOptions,
                  ...newValue.filter(
                    (option) => fixedOptions.indexOf(option) === -1
                  ),
                ]);
              }}
              options={data}
              getOptionLabel={(option) => option?.spare || ""}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option?.spare}
                    {...getTagProps({ index })}
                    disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
              }
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fixed tag"
                  placeholder="Favorites"
                />
              )}
            />

            <TextField
              type="date"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={deadlineRef}
              value={userData.deadline}
              onChange={handleChange}
              name="deadline"
            />

            <TextField
              label={"Problem Description"}
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={problemDescriptionRef}
              value={userData.problem_description}
              onChange={handleChange}
              name="problem_description"
            />

            <TextField
              label="Price"
              sx={{ width: "100%" }}
              type="number"
              variant="outlined"
              inputRef={priceRef}
              value={userData.price}
              onChange={handleChange}
              name="price"
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
              Submit
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
