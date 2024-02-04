import { Col, Input, Row } from "antd";
import Listing from "../components/lib/listing/Listing";
import TitlePage from "../components/lib/TitlePage";
import { formatQuota } from "../helpers";

function Customer() {
  return (
    <Row>
      <Col span={24}>
        <TitlePage text="Customer" />
      </Col>
      <Col span={24}>
        <Listing
          pagination={false}
          endpoint="customer"
          customFilter={[<Input key={1} placeholder="Search Customer Name" />]}
        >
          <Listing.Column title="Customer Name" dataIndex="customerName" />
          <Listing.Column title="Phone Number" dataIndex="phoneNumber" />
          <Listing.Column
            title="Quota Amount"
            dataIndex="quotaAmount"
            render={(quota) => `${formatQuota(quota)} GB`}
          />
          <Listing.Column title="Period" dataIndex="period" />
          <Listing.Column
            title="Credit"
            dataIndex="credit"
            render={(val) => `Rp ${val}`}
          />
        </Listing>
      </Col>
    </Row>
  );
}

export default Customer;
