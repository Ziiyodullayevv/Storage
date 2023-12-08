import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState } from "react";
import "./analytic.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Analytic = () => {
  const url = import.meta.env.VITE_KEY;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [yearClient, setYearClient] = useState<any>({});
  const [weekClient, setWeekClient] = useState<any>({});
  const [dayClient, setDayClient] = useState<any>({});
  const [monthClient, setMonthClient] = useState<any>({});
  const [order, setOrder] = useState<any>(null);
  const [orderMonth, setOrderMonth] = useState<any>({});
  const [price, setPrice] = useState<any>({});

  useEffect(() => {
    fetch(`${url}/storage/analytics/yearly_client/`)
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("/signin");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setYearClient(data);
      })
      .catch((err) => console.error(err));

    fetch(`${url}/storage/analytics/weekly_client/`)
      .then((res) => res.json())
      .then((data) => setWeekClient(data))
      .catch((err) => console.log(err));

    fetch(`${url}/storage/analytics/daily_client/`)
      .then((res) => res.json())
      .then((data) => setDayClient(data))
      .catch((err) => console.log(err));

    fetch(`${url}/storage/analytics/monthly_client/`)
      .then((res) => res.json())
      .then((data) => setMonthClient(data))
      .catch((err) => console.log(err));

    fetch(`${url}/storage/analytics/daily_order/`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.log(err));

    fetch(`${url}/storage/analytics/monthly_order/`)
      .then((res) => res.json())
      .then((data) => setOrderMonth(data))
      .catch((err) => console.log(err));

    fetch(`${url}/storage/analytics/monthly_order/`)
      .then((res) => res.json())
      .then((data) => setOrderMonth(data))
      .catch((err) => console.log(err));

    fetch(`${url}/storage/analytics/order_total_price/`)
      .then((res) => res.json())
      .then((data) => setPrice(data))
      .catch((err) => console.log(err));
  }, [url, token]);

  return (
    <div style={{ height: "100%" }}>
      {token ? (
        <div className="analytic">
          <Navbar props={"Аналитика"} />
          <div className="wrapper">
            <div className="analyticPage">
              <div className="boxWarpper">
                <div className="box-g-wrapper">
                  <div className="box-g blue">
                    <div className="icon-wrapper">
                      <GroupsIcon
                        style={{ fontSize: "40px", color: "white" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title">{weekClient?.message || 0}</h4>
                    </div>
                  </div>
                  <div className="box-g green">
                    <div className="icon-wrapper">
                      <GroupsIcon
                        style={{ fontSize: "40px", color: "white" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title">{yearClient.message}</h4>
                    </div>
                  </div>
                </div>

                <div className="box-c-wrapper">
                  <div className="box-c red">
                    <div className="icon-wrapper">
                      <GroupsIcon
                        style={{ fontSize: "40px", color: "white" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title">{dayClient?.message || 0}</h4>
                    </div>
                  </div>
                  <div className="box-c yellow">
                    <div className="icon-wrapper">
                      <GroupsIcon
                        style={{ fontSize: "40px", color: "white" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title">{monthClient?.message || 0}</h4>
                    </div>
                  </div>
                </div>

                <div className="box-f-wrapper">
                  <div style={{ backgroundColor: "#63ddc0" }} className="box-f">
                    <div className="icon-wrapper">
                      <AttachMoneyIcon
                        style={{ fontSize: "40px", color: "white" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title w-30">Итоговая цена</h4>
                      <h4 className="title w-30">
                        {price?.total_price || 0} рубль
                      </h4>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#50a1f8" }} className="box-f">
                    <div className="icon-wrapper">
                      <AttachMoneyIcon
                        style={{ fontSize: "40px", color: "white" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title w-30">{order?.message || 0}</h4>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#ef7188" }} className="box-f">
                    <div className="icon-wrapper">
                      <AttachMoneyIcon
                        style={{ fontSize: "40px", color: "white" }}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title w-30">{orderMonth?.message || 0}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <>{navigate("/signin")}</>
      )}
    </div>
  );
};

export default Analytic;
