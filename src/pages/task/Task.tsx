import { useContext, useEffect, useState } from "react";
import { Modal, Input } from "antd";
import Button from "@mui/material/Button";
import { RiEdit2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import Footer from "../../components/footer/Footer";
import Add from "../../components/addTask/AddTask";
import "./task.scss";
import { useNavigate } from "react-router-dom";
import { TasksContext } from "../../context/Tasks";

const Task = () => {
  const navigate = useNavigate();
  const tasks: string = "Задача";
  const url = import.meta.env.VITE_KEY;
  const token: string | null = localStorage.getItem("token");
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTaskList] = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingTask, setIsEditingTask] = useState<any>(null);
  const [kerakszData, setkerakszData] = useState({});
  console.log(kerakszData);

  useEffect(() => {
    fetch(`${url}/task/list`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTaskList(data);
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // antd-columns:

  const columns = [
    {
      key: "1",
      title: "№",
      dataIndex: "id",
      render: (idBac: any, test: any, index: any) => {
        setkerakszData(test);
        return <span className={idBac}>{index + 1}</span>;
      },
    },
    {
      key: "2",
      title: "Заголовок",
      dataIndex: "title",
      render: (title: string) => (
        <span style={{ textTransform: "capitalize" }}>{title}</span>
      ),
    },
    {
      key: "3",
      title: "Имя менеджера",
      dataIndex: "manager_full_name",
      render: (title: string) => (
        <span style={{ textTransform: "capitalize" }}>{title}</span>
      ),
    },
    {
      key: "4",
      title: "Сотрудник",
      dataIndex: "employee_full_name",
      render: (title: string) => (
        <span style={{ textTransform: "capitalize" }}>{title}</span>
      ),
    },
    {
      key: "5",
      title: "Устройство",
      dataIndex: "device_name",
      render: (title: string) => (
        <span style={{ textTransform: "capitalize" }}>{title}</span>
      ),
    },
    {
      key: "6",
      title: "Действия",
      render: (record: any) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <RiEdit2Line
            onClick={() => handleEditTask(record)}
            style={{ fontSize: "20px", cursor: "pointer" }}
          />
          <AiOutlineDelete
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteTask(record?.id)}
          />
        </div>
      ),
    },
  ];

  // handleDeleteTask:
  const handleDeleteTask = async (id: number) => {
    const refreshData = async () => {
      try {
        const response = await fetch(`${url}/task/list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const taskList = await response.json();
        setTaskList(taskList);
      } catch (err) {
        console.log(err);
      }
    };

    Modal.confirm({
      title: "Вы уверены, что хотите открыть эту информацию?",
      okText: "Хорошо",
      cancelText: "Отмена",
      okType: "danger",
      onOk: async () => {
        await fetch(`${url}/task/list/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Yangi malumotlarni olish
        await refreshData();
      },
    });
  };

  // handleEditTask:
  const handleEditTask = async (record: object[]) => {
    setIsEditing(true);
    setIsEditingTask({ ...record });
  };

  // handleSubmit:
  const handleSubmit = async () => {
    const refreshData = async () => {
      try {
        const response = await fetch(`${url}/task/list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const taskList = await response.json();
        setTaskList(taskList);
      } catch (err) {
        console.log(err);
      }
    };

    try {
      const response = await fetch(`${url}/task/list/${isEditingTask.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: isEditingTask?.title,
          manager_full_name: isEditingTask?.manager_full_name,
          employee_full_name: isEditingTask?.employee_full_name,
          device_name: isEditingTask?.device_name,
        }),
      });

      if (!response.ok) {
        throw new Error("Ma'lumotni yangilashda xatolik yuzaga keldi");
      }
      // Malumotlarni qayta olish
      await refreshData();
    } catch (error) {
      console.error("Ma'lumotni yangilashda xatolik:", error);
    }
  };

  // resetEditing:
  const resetEditing = () => {
    setIsEditing(false);
    setIsEditingTask(null);
  };

  return (
    <div className="storage">
      <div>
        <Navbar props={tasks} />
        <div className="storagePage">
          <Button
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "#2F89E3",
              boxShadow: "none",
              padding: "10px 30px",
              marginBottom: "15px",
            }}
            variant="contained"
          >
            Новое задание
          </Button>
          <Add setOpen={setOpen} open={open} slug="задача" />
          <AntdTable columns={columns} dataSource={task} />
          <Modal
            title="Edit Task"
            open={isEditing}
            okText={"Save"}
            onCancel={() => resetEditing()}
            onOk={() => {
              resetEditing();
              handleSubmit();
            }}
          >
            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingTask?.title}
              onChange={(e) => {
                setIsEditingTask((pre: object[]) => {
                  return { ...pre, title: e.target.value };
                });
              }}
            />
            <Input
              disabled
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingTask?.manager_full_name}
              onChange={(e) => {
                setIsEditingTask((pre: object[]) => {
                  return { ...pre, manager_full_name: e.target.value };
                });
              }}
            />
            <Input
              disabled
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingTask?.employee_full_name}
              onChange={(e) => {
                setIsEditingTask((pre: object[]) => {
                  return { ...pre, employee_full_name: e.target.value };
                });
              }}
            />
            <Input
              disabled
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingTask?.device_name}
              onChange={(e) => {
                setIsEditingTask((pre: object[]) => {
                  return { ...pre, device_name: e.target.value };
                });
              }}
            />
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Task;
