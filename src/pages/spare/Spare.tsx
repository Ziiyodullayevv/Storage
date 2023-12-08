import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import "./spare.scss";
import Footer from "../../components/footer/Footer";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "antd";
import { SparesContext } from "../../context/Spare";
import AddSpare from "../../components/addSpare/AddSpare";
import { useNavigate } from "react-router-dom";

const Spare = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const spare = "Запасной";
  const [open, setOpen] = useState(false);
  const [spareList, setSpareList] = useContext(SparesContext);
  const [kerakszData, setkerakszData] = useState({});
  console.log(kerakszData);

  useEffect(() => {
    fetch(`${url}/product/spare_list_with_id`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSpareList(data);
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
      title: "Имя",
      dataIndex: "name",
      render: (text: string) => (
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      ),
    },
    {
      key: "3",
      title: "Первая цена",
      dataIndex: "first_price",
      render: (firstPrice: string) => {
        return (
          <div>
            <span>{firstPrice}$</span>
          </div>
        );
      },
    },

    {
      key: "4",
      title: "Последняя цена",
      dataIndex: "last_price",
      render: (lastPrice: string) => {
        return (
          <div>
            <span>{lastPrice}$</span>
          </div>
        );
      },
    },

    {
      key: "5",
      title: "Создать данные",
      dataIndex: "created_date",
      render: (createdDate: string) => {
        return (
          <div>
            <span>{createdDate?.slice(0, 10)}</span>{" "}
            <span>{createdDate?.slice(11, 16)}</span>
          </div>
        );
      },
    },

    {
      key: "6",
      title: "Действия",
      render: (record: any) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
        const response = await fetch(`${url}/product/spare_list_with_id`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const accountList = await response.json();
        setSpareList(accountList);
      } catch (err) {
        console.log(err);
      }
    };

    Modal.confirm({
      title: "Вы уверены, что хотите удалить эту информацию?",
      okText: "Да",
      cancelText: "Нет",
      okType: "danger",
      onOk: async () => {
        await fetch(`${url}/product/spare_delete/${id}`, {
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

  return (
    <div className="storage">
      <div>
        <Navbar props={spare} />
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
            Новая запас
          </Button>
          <AddSpare setOpen={setOpen} open={open} slug={spare} />
          <AntdTable columns={columns} dataSource={spareList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Spare;
