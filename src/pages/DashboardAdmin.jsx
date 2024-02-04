import { Button, Col, Row } from "antd";
import TitlePage from "../components/lib/TitlePage";
import LastPurchase from "../components/home/LastPurchase";
import useLogin from "../hooks/useLogin";
import Charts from "../components/dashboard/Charts";

const DashboardAdmin = () => {
  const { onLogOut } = useLogin();

  return (
    <Row>
      <Col span={24}>
        <TitlePage text="Dashboard" />
      </Col>
      <Col span={24}>
        <Charts />
      </Col>
      <Col span={24}>
        <LastPurchase />
      </Col>

      <Col span={24}>
        <Button
          danger
          onClick={() => {
            onLogOut();
          }}
        >
          Logout
        </Button>
      </Col>
    </Row>
  );
};
export default DashboardAdmin;
