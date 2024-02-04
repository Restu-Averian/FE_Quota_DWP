import { Col, Row } from "antd";
import TitlePage from "../components/lib/TitlePage";
import LastPurchase from "../components/home/LastPurchase";
import Charts from "../components/dashboard/Charts";

const DashboardAdmin = () => {
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
    </Row>
  );
};
export default DashboardAdmin;
