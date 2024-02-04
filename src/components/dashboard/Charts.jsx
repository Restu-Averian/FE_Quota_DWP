import { Column } from "@ant-design/plots";
import useFetch from "../../hooks/useFetch";
import { useEffect, useMemo, useState } from "react";
import { Col, Row, Typography } from "antd";
import { formatQuota } from "../../helpers";

const Charts = () => {
  const fetch = useFetch();

  const [quotaState, setQuotaState] = useState([]);

  const getQuota = () => {
    fetch({ method: "get" }, "quota")?.then(({ data }) => {
      setQuotaState(
        data?.map((d) => ({
          quotaAmount: formatQuota(d?.quotaAmount),
          purchaseCount: d?.purchaseCount,
        }))
      );
    });
  };

  const config = useMemo(() => {
    return {
      data: quotaState,
      xField: "quotaAmount",
      yField: "purchaseCount",
    };
  }, [quotaState]);

  useEffect(() => {
    getQuota();
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Typography.Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Quota Graph
        </Typography.Text>
        <Column {...config} />
      </Col>
    </Row>
  );
};
export default Charts;
