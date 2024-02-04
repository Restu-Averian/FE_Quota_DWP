import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const TitlePage = ({ text, subText, backUrl }) => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col span={24}>
        <Space style={{ width: "100%" }}>
          {backUrl && (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                navigate(backUrl);
              }}
            />
          )}
          <Title level={3} style={{ fontSize: 36, fontWeight: "bold" }}>
            {text}
          </Title>
        </Space>
      </Col>
      <Col span={24}>
        <Text style={{ fontSize: 20 }}>{subText}</Text>
      </Col>
    </Row>
  );
};
export default TitlePage;
