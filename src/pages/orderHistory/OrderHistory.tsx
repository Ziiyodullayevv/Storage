import Navbar from "../../components/Navbar/Navbar";
import "./orderHistory.scss";

const OrderHistory = () => {
  const history = "History";
  return (
    <div className="history">
      <Navbar props={history} /> 
    </div>
  );
};

export default OrderHistory;
