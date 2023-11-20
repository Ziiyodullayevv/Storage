import { menu } from "../../utils/data";
import "./menu.scss";

import logo from "../../assets/Новый проект (2).png";
import { Link, ListItem } from "./style";
const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="menuLine">
        <span></span>
      </div>

      <div className="menuList">
        {menu.map((item) => (
          <ListItem key={item.id}>
            <Link to={item.path}>
              <div className="icon">
                <img src={item.icon} alt="icon" />
              </div>
              <span>{item.title}</span>
            </Link>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default Menu;
