import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import "./product.scss";
import Footer from "../../components/footer/Footer";
import AddProduct from "../../components/addProduct/AddProduct";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/Product";

const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const access = localStorage.getItem("access");
  const url = import.meta.env.VITE_KEY;
  const products = "Product";
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useContext(ProductContext);

  if (access) return navigate("/signin");

  // antd-columns:
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "IMEI",
      dataIndex: "imei",
    },

    {
      key: "4",
      title: "Client",
      dataIndex: "client",
    },
    {
      key: "6",
      title: "Actions",
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
      title: "Rostdan ham ushbu malumotni ochirmoqchimisiz",
      okText: "Yes",
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
            New Product
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
