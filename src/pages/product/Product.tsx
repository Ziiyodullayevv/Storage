import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import "./product.scss";
import Footer from "../../components/footer/Footer";
import AddProduct from "../../components/addProduct/AddProduct";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "antd";
import { ProductContext } from "../../context/Product";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const products = "Продукт";
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useContext(ProductContext);
  const [kerakszData, setkerakszData] = useState({});
  console.log(kerakszData);

  useEffect(() => {
    fetch(`${url}/product/device_list_or_create/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductList(data);
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
      render: (name: string) => (
        <span style={{ textTransform: "capitalize" }}>{name}</span>
      ),
    },
    {
      key: "3",
      title: "IMEI",
      dataIndex: "imei",
    },

    {
      key: "4",
      title: "Клиент",
      dataIndex: "client",
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
        const response = await fetch(`${url}/product/device_list_or_create/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Ma'lumotlarni qayta olishda xatolik");
        }

        const accountList = await response.json();
        setProductList(accountList);
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
        await fetch(`${url}/product/device/delete/${id}/`, {
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
        <Navbar props={products} />
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
            Новый продукт
          </Button>
          <AddProduct setOpen={setOpen} open={open} slug="Product" />
          <AntdTable columns={columns} dataSource={productList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
