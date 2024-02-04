import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useLogin from "./useLogin";

const useGetUserInfo = () => {
  const { loginInfo } = useLogin();

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

  return { loginState };
};

export default useGetUserInfo;
