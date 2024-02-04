import { Avatar, Dropdown, Flex, Image, Space, Typography } from "antd";
import CountUp from "react-countup";
import Thropy from "../thropy/Thropy";
import useLogin from "../../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { formatQuota } from "../../../helpers/index";
import useGetUserInfo from "../../../hooks/useGetUserInfo";

const { Text } = Typography;
const Header = () => {
  const { isAdmin, onLogOut } = useLogin();
  const navigate = useNavigate();

  const { loginState } = useGetUserInfo();

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ backgroundColor: "white", padding: 30 }}
    >
      <Image
        src="https://www.dwp.com.pk/wp-content/themes/striking/images/DWP-GROUP-LOGO.png"
        preview={false}
      />
      <Space size="large">
        {!isAdmin && (
          <>
            <div>
              Rp <CountUp end={loginState?.credit} duration={0.8} />
            </div>
            <Thropy value={loginState?.point} />
            <div>
              <CountUp
                end={formatQuota(loginState?.quotaAmount)}
                duration={0.8}
              />{" "}
              GB
            </div>
          </>
        )}

        <Text>{loginState?.customerName}</Text>
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                label: "Profile",
                key: "/profile",
                onClick: () => {
                  navigate("/");
                },
              },
              { type: "divider" },
              {
                label: "Logout",
                key: "/logout",
                style: {
                  backgroundColor: "#ff4d4f",
                  color: "white",
                },
                onClick: () => {
                  onLogOut();
                },
              },
            ],
          }}
        >
          <Avatar size={64} style={{ cursor: "pointer" }}>
            {loginState?.customerName}
          </Avatar>
        </Dropdown>
      </Space>
    </Flex>
  );
};
export default Header;
