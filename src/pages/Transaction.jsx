import { Col, Input, Row } from "antd";
import Listing from "../components/lib/listing/Listing";
import TitlePage from "../components/lib/TitlePage";

function Transaction() {
  return (
    <Row>
      <Col span={24}>
        <TitlePage text="Transaction" />
      </Col>
      <Col span={24}>
        <Listing
          endpoint="transaction"
          pagination={false}
          customFilter={[<Input key={1} placeholder="Search Customer Name" />]}
        >
          <Listing.Column title="Customer Name" dataIndex="customerName" />
          <Listing.Column
            title="Quota Amount"
            dataIndex="quotaAmount"
            render={(quota) => `${quota} GB`}
          />
          <Listing.Column
            title="Price"
            dataIndex="price"
            render={(val) => `Rp ${val}`}
          />
          <Listing.Column title="Period" dataIndex="period" />
        </Listing>
      </Col>
    </Row>
  );
}

export default Transaction;
