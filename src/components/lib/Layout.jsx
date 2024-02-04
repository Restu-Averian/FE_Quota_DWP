import { Layout as LayoutAntd, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Header from "./Layout/Header";

const { Sider, Content } = LayoutAntd;

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const { isLogin, isAdmin } = useLogin();

  const menuData = isAdmin
    ? [
        {
          key: "/dashboard",
          label: "Dashboard",
        },
        {
          key: "/customer",
          label: "Customer",
        },
        {
          key: "/transaction",
          label: "Transaction",
        },
      ]
    : [
        {
          key: "/",
          label: "Profile",
        },
        {
          key: "/quota",
          label: "Quota",
        },
      ];

  return (
    <LayoutAntd>
      {isLogin && (
        <LayoutAntd
          style={{
            position: "sticky",
            height: 90,
            zIndex: 999,
            marginBottom: 80,
            top: 0,
          }}
        >
          <Header />
        </LayoutAntd>
      )}
      <LayoutAntd>
        {isLogin && (
          <Sider
            width={200}
            style={
              {
                // background: colorBgContainer,
              }
            }
          >
            <Menu
              onClick={({ key }) => {
                navigate(key);
              }}
              mode="inline"
              defaultSelectedKeys={window.location.pathname}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={menuData}
            />
          </Sider>
        )}
        <LayoutAntd
          style={{
            padding: "0 24px 24px",
            position: "relative",
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "white",
              //   borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </LayoutAntd>
      </LayoutAntd>
    </LayoutAntd>
  );
};
export default Layout;
