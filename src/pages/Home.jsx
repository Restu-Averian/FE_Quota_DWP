import { Col, Row } from "antd";
import TitlePage from "../components/lib/TitlePage";
import useLogin from "../hooks/useLogin";
import CreditQuota from "../components/home/CreditQuota";
import LastPurchase from "../components/home/LastPurchase";

const Home = () => {
  const { loginInfo } = useLogin();

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
    </Row>
  );
};
export default Home;
