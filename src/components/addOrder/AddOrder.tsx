import React, { useEffect, useState, useRef, useContext } from "react";
import "./addOrder.scss";

// mui:
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
} from "@mui/material";

//react icons:
import { AiOutlineClose } from "react-icons/ai";
import { TasksContext } from "../../context/Tasks";
import { AccountContext } from "../../context/Account";
import { ProductContext } from "../../context/Product";
import { StorageContext } from "../../context/Storage";

// type props:
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddOrder = (props: Props) => {
  const url = import.meta.env.VITE_KEY;
  const token = localStorage.getItem("token");
  const [, setTaskList] = useContext(TasksContext);
  const [client] = useContext(AccountContext);
  const [device] = useContext(ProductContext);
  const [storage] = useContext(StorageContext);

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
  const clientRef = useRef<HTMLSelectElement>(null);
  const deviceRef = useRef<HTMLSelectElement>(null);
  const problemDescriptionRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  // submit-data:
  interface UserData {
    client: number;
    device: number;
    storage: object[];
    deadline: string;
    problem_description: string;
    price: string;
  }

  const [userData, setUserData] = useState<UserData>({
    client: 0,
    device: 0,
    storage: [],
    deadline: "",
    problem_description: "",
    price: "",
  });

  // handleChange:
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fixedOptions = [storage[0]];
  const [value, setValue] = React.useState([...fixedOptions]);

  const arr = value?.map((item) => {
    return item?.id;
  });

  // handleSubmit:
  const handleSubmit = async () => {
    const refreshData = () =>
      fetch(`${url}/order/list/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((tasks) => {
          setTaskList(tasks);
        })
        .catch((err) => console.log(err));
    try {
      await fetch(`${url}/order/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...userData, storage: arr }),
      });

      // Yangi ma'lumotlarni olish:
      refreshData();
      setUserData({
        client: 0,
        device: 0,
        storage: [],
        deadline: "",
        problem_description: "",
        price: "",
      });
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
              options={storage}
              getOptionLabel={(option) => option?.spare}
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
