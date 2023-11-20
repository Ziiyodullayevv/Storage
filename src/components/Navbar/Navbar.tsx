import { Link } from "react-router-dom";
import "./navbar.scss";
import { CiLogout } from "react-icons/ci";

type Props = {
  props: string;
};

const Navbar = ({ props }: Props) => {
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <h4>{props}</h4>
      </div>
      <div className="navbarRight">
        <CiLogout />
        <Link className="logOut" to={"/signin"}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
