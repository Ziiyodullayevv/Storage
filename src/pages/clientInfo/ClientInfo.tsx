import Navbar from "../../components/Navbar/Navbar";
import "./clientInfo.scss";

const ClientInfo = () => {
  const info = "Info";
  return (
    <div className="clientInfo">
      <Navbar props={info} />
    </div>
  );
};

export default ClientInfo;
