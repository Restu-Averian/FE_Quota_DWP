import { Button, Col, Row } from "antd";
import TitlePage from "../components/lib/TitlePage";
import useLogin from "../hooks/useLogin";
import CreditQuota from "../components/home/CreditQuota";
import LastPurchase from "../components/home/LastPurchase";

const Home = () => {
  const { loginInfo, onLogOut } = useLogin();

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <TitlePage text={`Welcome, ${loginInfo?.customerName}`} />
      </Col>
      <Col span={24}>
        <CreditQuota />
      </Col>

      <Col span={24}>
        <LastPurchase id={loginInfo?.id} />
      </Col>

      <Col span={24}>
        <Button
          danger
          onClick={() => {
            onLogOut();
          }}
        >
          Log Out
        </Button>
      </Col>
    </Row>
  );
};
export default Home;
