import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={key}>{label}</Link>,
  };
}

const items = [
  getItem("Profile", "profile", <UserOutlined />, [
    getItem("Your profile", "profile"),
    getItem("Change password", "change-password"),
  ]),
];

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [name, setName] = useState("");

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
    console.log(parseAccount);

    const { name } = parseAccount;
    setName(name);
  }, []);

  return (
    <div className="admin">
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} collapsedWidth={150}>
          <div className="admin__sidebar">
            <div className="admin__sidebar__content">
              <div className="demo-logo-vertical" />
              <h1 className="admin__welcome">Welcome {name}</h1>
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
            </div>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          ></Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              {breadcrumbItems}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {<Outlet />}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            {new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
