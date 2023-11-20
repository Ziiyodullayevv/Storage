import Navbar from "../../components/Navbar/Navbar";
import "./sale.scss";

const Sale = () => {
  const sale = "Sales";
  return (
    <div className="sale">
      <Navbar props={sale} />
    </div>
  );
};

export default Sale;
