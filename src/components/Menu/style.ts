import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ListItem = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
  align-items: center;
  .active {
    color: white;
    background-color: rgba(255, 255, 255, 0.07);
  }
  .active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    width: 2px;
    background-color: #2f89e3;
  }
`;

const Link = styled(NavLink)`
  position: relative;
  width: 100%;
  padding: 10px 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  color: #fff;
  transition: all 0.2s ease;
`;

export { Link, ListItem };
