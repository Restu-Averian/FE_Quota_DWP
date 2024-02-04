import { Avatar, Flex, Image, Space, Tooltip } from "antd";
import CountUp from "react-countup";
import Thropy from "../thropy/Thropy";
import useLogin from "../../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";

const Header = () => {
  const { loginInfo, isAdmin } = useLogin();
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState({});

  const fetch = useFetch();

  const getUserInfo = () => {
    fetch(
      {
        method: "GET",
      },
      `customer/?id=${loginInfo?.id}`
    )?.then(({ data }) => {
      setLoginState(data?.[0]);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, [window.location.pathname]);

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
          </>
        )}

        <Tooltip title={loginState?.customerName}>
          <Avatar
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            PP
          </Avatar>
        </Tooltip>
      </Space>
    </Flex>
  );
};
export default Header;
