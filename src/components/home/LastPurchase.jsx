import { Col, Row, Space, Typography } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import Listing from "../lib/listing/Listing";
import { formatQuota } from "../../helpers";
import useLogin from "../../hooks/useLogin";

const { Text } = Typography;
const LastPurchase = ({ id }) => {
  const { isAdmin } = useLogin();
  return (
    <Row>
      <Col span={24}>
        <Text style={{ fontSize: 18, fontWeight: "bolder" }}>
          Transaction History
        </Text>
      </Col>
      <Col span={24}>
        <Listing
          endpoint={id ? `transaction/?customer_id=${id}` : "transaction"}
        >
          {isAdmin && (
            <Listing.Column title="Customer Name" dataIndex="customerName" />
          )}
          <Listing.Column
            title="Quota Amount"
            dataIndex="quotaAmount"
            render={(quota) => `${formatQuota(quota)} GB`}
          />
          <Listing.Column
            title="Point"
            dataIndex="point"
            render={(point) => {
              return (
                <Space style={{ width: "100%" }}>
                  <CaretUpOutlined style={{ color: "green" }} />
                  <Text>{point}</Text>
                </Space>
              );
            }}
          />
          <Listing.Column title="Price" dataIndex="price" />
          <Listing.Column
            title="Period"
            dataIndex="period"
            render={(period) => `${period} Days`}
          />
        </Listing>
      </Col>
    </Row>
  );
};
export default LastPurchase;
