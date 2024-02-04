import { Modal } from "antd";
import { useEffect, useMemo, useState } from "react";

const useLogin = () => {
  const [isLogin, setLogin] = useState(false);

  const saveToCookies = (name, value) => {
    const date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();

    document.cookie = `${name}=${value}${expires};secure;path=/`;
  };

  const getCookie = (cName) => {
    let name = cName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return "";
  };

  const deleteCookies = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;secure;path=/`;
  };

  const loginInfo = getCookie("login_info");

  const isAdmin = useMemo(() => {
    return loginInfo?.role === 1;
  }, [loginInfo, window.location.pathname]);

  const onLogOut = () => {
    Modal?.confirm({
      title: "Are you sure to log out ?",
      okText: "Logout",
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        deleteCookies("login_info");
        window.location.href = "/login";
      },
    });
  };
  useEffect(() => {
    const checkLogin = Object.keys(loginInfo || {})?.length > 0;

    setLogin(checkLogin);

    if (!checkLogin && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, [window.location.pathname]);

  return {
    isLogin,
    loginInfo,
    saveToCookies,
    deleteCookies,
    isAdmin,
    onLogOut,
  };
};

export default useLogin;
