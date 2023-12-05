import React, { useEffect, useState, useRef, useContext } from "react";
import "./addTask.scss";

// mui:
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

//react icons:
import { AiOutlineClose } from "react-icons/ai";
import { TasksContext } from "../../context/Tasks";
import { useNavigate } from "react-router-dom";

// type props:
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  slug: string;
};

const AddTask = (props: Props) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_KEY;
  const token = localStorage.getItem("token");
  const [_, setTaskList] = useContext(TasksContext);

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

  // fetch-data state:
  const [employee, setEmployee] = useState(null);
  const [device, setDevice] = useState([]);

  // fetch-data:
  useEffect(() => {
    const getAccountList = async () => {
      try {
        const response = await fetch(`${url}/account/list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setEmployee(result);
      } catch (error) {
        console.log(error);
      }
    };

    const getDeviceList = async () => {
      try {
        const response = await fetch(`${url}/product/device_list_or_create/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setDevice(result);
      } catch (error) {
        console.log(error);
      }
    };

    getAccountList();
    getDeviceList();
  }, []);

  // refs:
  const taskTitleRef = useRef<HTMLInputElement>(null);
  const managerRef = useRef<HTMLSelectElement>(null);
  const employeeRef = useRef<HTMLSelectElement>(null);
  const deviceRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // submit-data:
  interface UserData {
    title: string;
    manager: number;
    employee: number;
    device: number;
    description: string;
  }

  const [userData, setUserData] = useState<UserData>({
    title: "",
    manager: 0,
    employee: 0,
    device: 0,
    description: "",
  });

  // handleChange:
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit:
  const handleSubmit = async () => {
    const refreshData = () =>
      fetch(`${url}/task/list/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((tasks) => {
          setTaskList(tasks);
        })
        .catch((err) => console.log(err));
    try {
      await fetch(`${url}/task/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      // Yangi ma'lumotlarni olish:
      refreshData();
      setUserData({
        title: "",
        manager: 0,
        employee: 0,
        device: 0,
        description: "",
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
            <TextField
              label="title"
              sx={{ width: "100%" }}
              variant="outlined"
              inputRef={taskTitleRef}
              value={userData.title}
              onChange={handleChange}
              name="title"
            />

            {/* Manager list  */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-1">Manger</InputLabel>
              <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select-1"
                inputRef={managerRef}
                value={userData.manager}
                label="Manager"
                onChange={handleChange}
                name="manager"
              >
                {employee?.data
                  .filter((item) => item.role === 0)
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.username}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Employee list  */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-2">Employee</InputLabel>
              <Select
                labelId="demo-simple-select-label-2"
                id="demo-simple-select-2"
                label="Employee"
                value={userData.employee}
                inputRef={employeeRef}
                onChange={handleChange}
                name="employee"
              >
                {employee?.data
                  .filter((item) => item.role === 1)
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.username}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Device list  */}
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
                {device.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextareaAutosize
              className="activeTexteria"
              minRows={3} // Minimal qator soni
              maxRows={7} // Maksimal qator soni
              aria-label="minimum height" // Kuzatishlar uchun matn
              placeholder="Description..." // Matn ko'rinishi
              value={userData.description}
              ref={descriptionRef}
              onChange={handleChange}
              name="description"
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

export default AddTask;
