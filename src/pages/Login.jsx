import { useState } from "react";
import { Button, Col, Form, Row, Space, message } from "antd";
import Input from "../components/lib/field/Input";
import Password from "../components/lib/field/Password";
import "../style/Login.css";
import TitlePage from "../components/lib/TitlePage";
import useFetch from "../hooks/useFetch";
import useLogin from "../hooks/useLogin";
import Illustration from "../components/lib/illustration";

const Login = () => {
  const [formInstance] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [msg, messageCtx] = message.useMessage();

  const fetch = useFetch();

  const { saveToCookies } = useLogin();

  const getCustomerData = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetch({ method: "GET" }, "customer");
      return data;
    } catch (err) {
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = () => {
    formInstance?.validateFields()?.then(() => {
      getCustomerData()?.then((data) => {
        const formData = formInstance?.getFieldsValue(true);

        const { password, phoneNumber } = formData;

        const findCustomer = data?.find((d) => d?.phoneNumber === phoneNumber);

        const isPasswordCorrect = findCustomer?.password === password;

        if (
          Object.keys(findCustomer || "{}")?.length > 0 &&
          isPasswordCorrect
        ) {
          window.location.href = "/";

          const loginInfo = {
            id: findCustomer?.id,
            role: findCustomer?.role,
            customerName: findCustomer?.customerName,
          };

          saveToCookies("login_info", JSON.stringify(loginInfo));
        } else {
          msg?.error({
            content:
              "There's wrong information between phone number and password",
            key: "error_login",
            duration: 1,
          });
        }
        console.log(formInstance?.getFieldsValue(true), data);
      });
    });
  };

  return (
    <Row style={{ overflow: "hidden", height: "100vh" }}>
      {messageCtx}
      <Col span={12}>
        <Illustration name="login" />
      </Col>
      <Col
        span={12}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Space direction="vertical" style={{ width: "100%", padding: 80 }}>
          <TitlePage text="Login" subText="Welcome Back" />

          <Form form={formInstance}>
            <Input
              label="Phone Number"
              required
              name="phoneNumber"
              formItemObj={{
                labelCol: {
                  span: 24,
                },
              }}
            />
            <Password
              name="password"
              label="Password"
              required
              formItemObj={{
                labelCol: {
                  span: 24,
                },
              }}
            />

            <Form.Item>
              <Button
                htmlType="submit"
                block
                loading={isLoading}
                type="primary"
                onClick={() => {
                  onLogin();
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Col>
    </Row>
  );
};
export default Login;
