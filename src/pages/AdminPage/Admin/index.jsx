import { useEffect, useState } from "react";
import { UserOutlined, LogoutOutlined,DashboardOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { toast } from "react-toastify";

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <DashboardOutlined />, [
    getItem(<Link to="dashboard">Overview</Link>, "dashboard"),
  ]),
  getItem("Profile", "sub1", <UserOutlined />, [
    getItem(<Link to="profile">Your profile</Link>, "profile"),
    getItem(<Link to="change-password">Change password</Link>, "change-password"),
  ]),
  getItem("Account", "sub2", <UserOutlined />, [
    getItem(<Link to="total-account">Total</Link>, "total-account"),
    getItem(<Link to="list-user">User</Link>, "list-user"),
    getItem(<Link to="list-staff">Staff</Link>, "list-staff"),
  ]),
  getItem("Logout", "logout", <LogoutOutlined />),
];

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{pathSnippets[index]}</Link>
      </Breadcrumb.Item>
    );
  });

  useEffect(() => {
    const account = localStorage.getItem("account");
    const parseAccount = JSON.parse(account);
    setName(parseAccount.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("account");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="admin">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} collapsedWidth={150}>
          <div className="admin__sidebar">
            <div className="admin__sidebar__content">
              <div className="demo-logo-vertical" />
              <h1 className="admin__welcome">Welcome {name}</h1>
              <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items.map((item) => {
                  if (item.key === "logout") {
                    return {
                      ...item,
                      onClick: handleLogout, // Assign logout handler
                    };
                  }
                  return item;
                })}
              />
            </div>
          </div>
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>{breadcrumbItems}</Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>{new Date().getFullYear()}</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
