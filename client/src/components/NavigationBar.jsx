import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

function NavigationBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  function handleItemClick(_, { name }) {
    setActiveItem(name);
  }

  return (
    <div className="block-navigation">
      <Menu className="navigation-bar">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        >
          Главная
        </Menu.Item>

        <Menu.Item
          name="cabinet"
          active={activeItem === "cabinet"}
          onClick={handleItemClick}
          as={Link}
          to="/cabinet"
        >
          Личный Кабинет
        </Menu.Item>

        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          Логин
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default NavigationBar;
