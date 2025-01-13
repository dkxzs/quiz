import "react-pro-sidebar/dist/css/styles.css";
import { Link, useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaTachometerAlt, FaGem, FaGithub } from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { DiReact } from "react-icons/di";
import "./SideBar.scss";

const Sidebar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            <DiReact size={"3em"} color="00bfff" />
            <span onClick={() => navigate("/")}>Sudo Dev</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              <Link to="/admin" />
              Dashboard
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                <Link to="/admin/manage-users" />
                Manager Users
              </MenuItem>
              <MenuItem>
                <Link to="/admin/manage-quiz" />
                Manager Quiz
              </MenuItem>
              <MenuItem>
                <Link to="/admin/manage-questions" />
                Manager Questions
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  paddingLeft: "10px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Sudo Dev
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
