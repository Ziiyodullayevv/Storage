import Navbar from "../../components/Navbar/Navbar";
import AntdTable from "../../components/antdTable/AntdTable";
import Button from "@mui/material/Button";
import { useContext, useState, useEffect } from "react";
import "./storage.scss";
import Footer from "../../components/footer/Footer";
import { StorageContext } from "../../context/Storage";
import AddStorage from "../../components/addStorage/AddStorage";
import { useNavigate } from "react-router-dom";

const Storages = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;
  const storage = "Запчасть";
  const [open, setOpen] = useState(false);
  const [storageList, setStorageList] = useContext(StorageContext);
  const [kerakszData, setkerakszData] = useState({});
  console.log(kerakszData);

  useEffect(() => {
    fetch(`${url}/storage/list_or_create/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStorageList(data);
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
      title: "Забронировано",
      dataIndex: "is_booked",
      render: (name: boolean) => {
        if (name) {
          return (
            <span
              style={{
                color: "green",
                padding: "5px 10px",
                border: "1px solid green",
                borderRadius: "100px",
              }}
            >
              True
            </span>
          );
        } else {
          return (
            <span
              style={{
                color: "red",
                padding: "3px 10px",
                border: "1px solid red",
                borderRadius: "100px",
              }}
            >
              False
            </span>
          );
        }
      },
    },
    {
      key: "3",
      title: "Создать дату",
      dataIndex: "created_date",
      render: (name: string) => (
        <span style={{ textTransform: "capitalize" }}>
          {name?.slice(0, 10)}
        </span>
      ),
    },

    {
      key: "4",
      title: "Запчасть",
      dataIndex: "spare",
      render: (name: string) => (
        <span style={{ textTransform: "capitalize" }}>{name}</span>
      ),
    },
  ];

  return (
    <div className="storage">
      <div>
        <Navbar props={storage} />
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
          <AddStorage setOpen={setOpen} open={open} slug={storage} />
          <AntdTable columns={columns} dataSource={storageList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Storages;
