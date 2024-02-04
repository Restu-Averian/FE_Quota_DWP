import { Col, Row, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { sortArr } from "../../helpers";
import { API_URL } from "../../constants";
import TitlePage from "../../components/lib/TitlePage";
import CardQuota from "../../components/quota/CardQuota";

const Quota = () => {
  const fetch = useFetch();

  const [quotaData, setQuotaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const popularQuota = useMemo(() => {
    return sortArr(quotaData, "purchaseCount", "increment");
  }, [quotaData]);

  const getQuota = () => {
    setIsLoading(true);
    fetch({
      url: `${API_URL}/quota`,
    })
      ?.then(({ data }) => {
        setQuotaData(data);
      })
      ?.finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getQuota();
  }, []);
  return (
    <Row>
      <Col span={24}>
        <TitlePage text="Quota" />
      </Col>
      <Col span={24}>
        <Spin spinning={isLoading}>
          <Row gutter={[8, 8]} align="middle">
            <Col span={24}>
              <Row gutter={[32, 32]}>
                {popularQuota?.map((data, idx) => (
                  <Col span={6} key={idx}>
                    <CardQuota data={data} useBadge={idx < 3} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Spin>
      </Col>
    </Row>
  );
};
export default Quota;
