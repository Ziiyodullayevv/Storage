import { useContext, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal, Input, Select } from "antd";
import { Typography } from "@mui/material";
import { SelectValue } from "antd/lib/select";
import Button from "@mui/material/Button";
import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import Footer from "../../components/footer/Footer";
import "./order.scss";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../context/Order";
import { AccountContext } from "../../context/Account";
import { ProductContext } from "../../context/Product";
import { StorageContext } from "../../context/Storage";
import AddOrder from "../../components/addOrder/AddOrder";

const Orders = () => {
  const navigate = useNavigate();
  const access = localStorage.getItem("access");
  const clients = "Clients";
  const url = import.meta.env.VITE_KEY;
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [order, setOrderList] = useContext(OrderContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState<any>(null);
  const [clientList] = useContext(AccountContext);
  const [productList] = useContext(ProductContext);
  const [storageList] = useContext(StorageContext);

  if (access) return navigate("/signin");

  const columns = [
    {
      key: "1",
      title: "ID",
      render: (id, obj, index: number) => <span>{index + 1}</span>,
    },
    {
      key: "2",
      title: "Client Name",
      dataIndex: "client_full_name",
    },
    { key: "3", title: "Device Name", dataIndex: "device_name" },
    { key: "4", title: "Price", dataIndex: "price" },
    { key: "5", title: "Deadline", dataIndex: "deadline" },
    {
      key: "6",
      title: "Actions",
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
        const response = await fetch(`${url}/order/list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const accountList = await response.json();
        setOrderList(accountList || []);
      } catch (err) {
        console.log(err);
      }
    };

    Modal.confirm({
      title: "Rostdan ham ushbu malumotni ochirmoqchimisiz",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await fetch(`${url}/order/delete/${id}`, {
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
        const response = await fetch(`${url}/order/list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const accountList = await response.json();
        setOrderList(accountList || []);
      } catch (err) {
        console.log(err);
      }
    };

    try {
      const response = await fetch(
        `${url}/order/update/${isEditingClient.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            problem_description: isEditingClient?.problem_description,
            price: isEditingClient?.price,
            deadline: isEditingClient?.deadline,
            is_done: true,
            is_notificated: true,
            client: isEditingClient?.client,
            device: isEditingClient?.device,
            storage: [isEditingClient?.storage],
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

  const handleChange1 = (value: SelectValue) => {
    setIsEditingClient((prev: object[]) => ({
      ...prev,
      client: value,
    }));
  };

  const handleChange2 = (value: SelectValue) => {
    setIsEditingClient((prev: object[]) => ({
      ...prev,
      device: value,
    }));
  };

  const handleChange3 = (value: SelectValue) => {
    setIsEditingClient((prev: object[]) => ({
      ...prev,
      storage: value,
    }));
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
            New Order
          </Button>
          <AddOrder setOpen={setOpen} open={open} slug="Order" />
          <AntdTable columns={columns} dataSource={order} />
          <Modal
            title="Edit Account"
            open={isEditing}
            okText={"Save"}
            onCancel={() => resetEditing()}
            onOk={() => {
              resetEditing();
              handleSubmit();
            }}
          >
            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Problem Description:
            </Typography>
            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingClient?.problem_description}
              onChange={(e) => {
                setIsEditingClient((pre: object[]) => ({
                  ...pre,
                  problem_description: e.target.value,
                }));
              }}
            />
            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Price:
            </Typography>
            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingClient?.price}
              onChange={(e) => {
                setIsEditingClient((pre: object[]) => ({
                  ...pre,
                  price: e.target.value,
                }));
              }}
            />
            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Deadline:
            </Typography>
            <Input
              style={{ marginTop: "10px", padding: "10px" }}
              value={isEditingClient?.deadline}
              onChange={(e) => {
                setIsEditingClient((pre: object[]) => ({
                  ...pre,
                  deadline: e.target.value,
                }));
              }}
            />
            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Client:
            </Typography>
            <Select
              style={{
                width: "100%",
                marginTop: "10px",
                height: "45px",
              }}
              onChange={handleChange1}
              defaultValue={clientList?.[0]?.full_name}
              options={clientList?.map(({ id, full_name }) => ({
                value: id,
                label: full_name,
              }))}
            />

            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Divice:
            </Typography>
            <Select
              style={{
                width: "100%",
                marginTop: "10px",
                height: "45px",
              }}
              onChange={handleChange2}
              defaultValue={productList?.[0]?.name}
              options={productList?.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
            />
            <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
              Storage:
            </Typography>
            <Select
              style={{
                width: "100%",
                marginTop: "10px",
                height: "45px",
              }}
              onChange={handleChange3}
              defaultValue={storageList?.[0]?.spare}
              options={storageList?.map(({ id, spare }) => ({
                value: id,
                label: spare,
              }))}
            />
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
