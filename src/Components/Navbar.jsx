import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => (
  <Header>
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default Navbar;
