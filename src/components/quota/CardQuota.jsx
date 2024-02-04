import { Badge, Card, Col, Row, Space, Typography } from "antd";
import { formatNumber, formatQuota } from "../../helpers";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const CardQuota = ({ data, useBadge }) => {
  const navigate = useNavigate();

  const BadgeWrapper = useBadge ? Badge : Fragment;
  return (
    <BadgeWrapper {...(useBadge && { count: "Popular" })}>
      <Card
        hoverable
        style={{ width: 200 }}
        onClick={() => {
          navigate(`/quota/${data?.id}`);
        }}
      >
        <Row align="bottom">
          <Col span={12}>
            <Space direction="vertical">
              <Text strong>{formatQuota(data?.quotaAmount)} GB</Text>
              <Text>Rp {formatNumber(data?.price)}</Text>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Text strong>{data?.period} Days</Text>
          </Col>
        </Row>
      </Card>
    </BadgeWrapper>
  );
};

export default CardQuota;
