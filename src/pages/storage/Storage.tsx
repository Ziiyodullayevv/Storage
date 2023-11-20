import Navbar from "../../components/Navbar/Navbar";
import "./storage.scss";

const storage = "Storage";

const Storage = () => {
  return (
    <div className="storage">
      <Navbar props={storage} />
    </div>
  );
};

export default Storage;
