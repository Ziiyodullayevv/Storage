import Navbar from "../../components/Navbar/Navbar";
import "./analytic.scss";

const Analytic = () => {
  const analytic = "Analytic";
  return (
    <div className="analytic">
      <Navbar props={analytic} />
    </div>
  );
};

export default Analytic;
