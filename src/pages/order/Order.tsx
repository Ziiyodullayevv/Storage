import { useContext, useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal, Input, Select } from "antd";
import { Typography } from "@mui/material";
import { SelectValue } from "antd/lib/select";
import Button from "@mui/material/Button";
import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import Footer from "../../components/footer/Footer";
import { OrderContext } from "../../context/Order";
import { AccountContext } from "../../context/Account";
import { ProductContext } from "../../context/Product";
import { StorageContext } from "../../context/Storage";
import AddOrder from "../../components/addOrder/AddOrder";
import "./order.scss";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const clients = "Заказы";
  const url = import.meta.env.VITE_KEY;
  const [open, setOpen] = useState(false);
  const [order, setOrderList] = useContext(OrderContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState<any>(null);
  const [clientList] = useContext(AccountContext);
  const [productList] = useContext(ProductContext);
  const [, setStorageList] = useContext(StorageContext);
  const [kerakszData, setkerakszData] = useState({});
  console.log(kerakszData);

  useEffect(() => {
    fetch(`${url}/order/list`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrderList(data);
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      key: "id",
      title: "№",
      dataIndex: "id",
      render: (idBac: any, test: any, index: any) => {
        setkerakszData(test);
        return <span className={idBac}>{index + 1}</span>;
      },
    },
    {
      key: "client_full_name",
      title: "Имя клиента",
      dataIndex: "client_full_name",
      render: (text: string) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      key: "device_name",
      title: "Имя устройства",
      dataIndex: "device_name",
      render: (text: string) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },

    {
      key: "price",
      title: "Цена",
      dataIndex: "price",
      render: (price: string) => (
        <span>
          <span>{price}</span> <span style={{ fontWeight: "500" }}>рубль</span>
        </span>
      ),
    },
    { key: "deadline", title: "Крайний срок", dataIndex: "deadline" },
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

  // const [messageApi, contextHolder] = message.useMessage();
  // const success = () => {
  //   messageApi.open({
  //     type: "success",
  //     content: "Данные успешно добавлены!",
  //   });
  // };

  // const error = () => {
  //   messageApi.open({
  //     type: "error",
  //     content: `Данные уже существуют или поле не заполнено`,
  //   });
  // };

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

    const handleDeleteOrder = async (id: number) => {
      try {
        await fetch(`${url}/order/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        await refreshData(); // Agar refreshData ni ishlatishni istasangiz
        await updateStorage(); // Yangi qo'shilgan qism

        // Boshqa kodlar
      } catch (error) {
        console.error("Xatolik sodir bo'ldi:", error);
      }
    };

    const updateStorage = () => {
      fetch(`${url}/storage/list_or_create/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setStorageList(data);
        })
        .catch((err) => console.log(err));
    };

    const onOk = async () => {
      await handleDeleteOrder(id);
      // Boshqa kodlar
    };

    Modal.confirm({
      title: "Вы уверены, что хотите удалить эту информацию?",
      okText: "Да",
      cancelText: "Нет",
      okType: "danger",
      onOk: onOk,
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

  return (
    <>
      {token ? (
        <div className="storage">
          {/* {contextHolder} */}
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
                Новый заказ
              </Button>
              <AddOrder setOpen={setOpen} open={open} slug="Order" />
              <AntdTable columns={columns} dataSource={order} />
              <Modal
                title="Изменить заказ"
                open={isEditing}
                okText={"Save"}
                onCancel={() => resetEditing()}
                onOk={() => {
                  resetEditing();
                  handleSubmit();
                }}
              >
                <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
                  Описание проблемы:
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
                  Цена:
                </Typography>
                <Input
                  type="number"
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
                  Крайний срок:
                </Typography>
                <Input
                  type="date"
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
                  Клиент:
                </Typography>
                <Select
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    height: "45px",
                  }}
                  onChange={handleChange1}
                  options={clientList?.map(({ id, full_name }: any) => ({
                    value: id,
                    label: full_name,
                  }))}
                />

                <Typography sx={{ mt: "10px", mb: "-5px" }} variant="body2">
                  Дивайс:
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
              </Modal>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <>{navigate("/signin")}</>
      )}
    </>
  );
};

export default Orders;
