import { Link } from "react-router-dom";
import "./navbar.scss";
import { CiLogout } from "react-icons/ci";

type Props = {
  props: string;
};

const Navbar = ({ props }: Props) => {
  const handleDeleteToken = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <h4>{props}</h4>
      </div>
      <div className="navbarRight">
        <CiLogout />
        <Link className="logOut" onClick={handleDeleteToken} to={"/signin"}>
          Выход
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
