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
        <h4>Logout</h4>
      </div>
    </div>
  );
};

export default Navbar;
