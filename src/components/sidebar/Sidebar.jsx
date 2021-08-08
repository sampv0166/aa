import React from "react";

import { Link } from "react-router-dom";

import "./sidebar.css";

import useUserInfo from "../../pages/useToken";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const user = JSON.parse(localStorage.getItem("userInfo"));

const Sidebar = (props) => {
    const { user, setUser } = useUserInfo();
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <h3>KhyamatZaman</h3>
      </div>
      {sidebar_items.map((item, index) =>
        (user &&
          user.user.permissionslist.category &&
          item.display_name === "category") ||
        (user.user.permissionslist.product &&
          item.display_name === "Products") ||
        (user.user.permissionslist.subcategory &&
          item.display_name === "sub Category") ||
        (user.user.permissionslist.shop && item.display_name === "Store") ||
        (user.user.name === "admin" && item.display_name === "Users") ||
        item.display_name === "Dashboard" ? (
          <Link to={item.route} key={index}>
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Sidebar;
