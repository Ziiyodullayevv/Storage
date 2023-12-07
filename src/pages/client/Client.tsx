import { useContext, useState, useEffect } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal, Input } from "antd";
import Button from "@mui/material/Button";
import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import AccountCreate from "../../components/addAccount/AddAccount";
import Footer from "../../components/footer/Footer";
import "./client.scss";
import { AccountContext } from "../../context/Account";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const StorageList = () => {
  const clients = "Клиент";
  const navigate = useNavigate();
  const url = import.meta.env.VITE_KEY;
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [kerakszData, setkerakszData] = useState({});
  const [account, setAccountList] = useContext(AccountContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState<any>(null);
  console.log(kerakszData);

  useEffect(() => {
    fetch(`${url}/account/client/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAccountList(data);
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      key: "1",
      title: "№",
      render: (idBac: any, test: any, index: any) => {
        setkerakszData(test);
        return <span className={idBac}>{index + 1}</span>;
      },
    },
    {
      key: "2",
      title: "Имя пользователя",
      dataIndex: "username",
      render: (text: string) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      key: "3",
      title: "Электронная почта",
      dataIndex: "email",
      render: (text: string) => (
        <span style={{ textTransform: "lowercase" }}>{text}</span>
      ),
    },
    {
      key: "4",
      title: "Полное имя",
      dataIndex: "full_name",
      render: (text: string) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    { key: "5", title: "Номер телефона", dataIndex: "phone_number" },
    {
      key: "6",
      title: "Действия",
      render: (record: any) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <RiEdit2Line
            onClick={() => handleEditAccount(record)}
            style={{ fontSize: "20px", cursor: "pointer" }}
          />
          <AiOutlineDelete
            style={{ fontSize: "20px", cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteClient(record?.id)}
          />
        </div>
      ),
    },
  ];

  //handleDelete:
  const handleDeleteClient = async (id: number) => {
    const refreshData = async () => {
      try {
        const response = await fetch(`${url}/account/client/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const accountList = await response.json();
        setAccountList(accountList || []);
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
        await fetch(`${url}/account/client/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        await refreshData();
      },
    });
  };

  const handleEditAccount = async (record: any) => {
    setIsEditing(true);
    setIsEditingClient({ ...record });
  };

  //handleSubmit:
  const handleSubmit = async () => {
    const refreshData = async () => {
      try {
        const response = await fetch(`${url}/account/client/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const accountList = await response.json();
        setAccountList(accountList || []);
      } catch (err) {
        console.log(err);
      }
    };

    try {
      const response = await fetch(
        `${url}/account/client/update/${isEditingClient.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: isEditingClient?.username,
            email: isEditingClient?.email,
            full_name: isEditingClient?.full_name,
            phone_number: isEditingClient?.phone_number,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ma'lumotni yangilashda xatolik yuzaga keldi");
      }

      await refreshData();
    } catch (error) {
      console.error("Ma'lumotni yangilashda xatolik:", error);
    }
  };

  const resetEditing = () => {
    setIsEditing(false);
    setIsEditingClient(null);
  };

  return (
    <div className="storage">
      <div>
        <Navbar props={clients} />
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
            Новый клиент
          </Button>
          <AccountCreate setOpen={setOpen} open={open} slug="клиента" />
          <AntdTable columns={columns} dataSource={account} />
          <Modal
            title="Редактировать аккаунт"
            open={isEditing}
            okText={"Save"}
            onCancel={() => resetEditing()}
            onOk={() => {
              resetEditing();
              handleSubmit();
            }}
          >
            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Имя пользователя:
            </Typography>

            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingClient?.username}
              onChange={(e) => {
                setIsEditingClient((pre: object[]) => ({
                  ...pre,
                  username: e.target.value,
                }));
              }}
            />

            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Электронная почта:
            </Typography>
            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingClient?.email}
              onChange={(e) => {
                setIsEditingClient((pre: object[]) => ({
                  ...pre,
                  email: e.target.value,
                }));
              }}
            />

            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Полное имя:
            </Typography>
            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingClient?.full_name}
              onChange={(e) => {
                setIsEditingClient((pre: object[]) => ({
                  ...pre,
                  full_name: e.target.value,
                }));
              }}
            />

            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Номер телефона:
            </Typography>
            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingClient?.phone_number}
              onChange={(e) => {
                setIsEditingClient((pre: object[]) => ({
                  ...pre,
                  phone_number: e.target.value,
                }));
              }}
            />
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StorageList;
