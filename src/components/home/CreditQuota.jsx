import { Col, Progress, Row, Space, Typography } from "antd";
import CountUp from "react-countup";
import { formatNumber, formatQuota } from "../../helpers";
import "../../style/progress.css";
import useGetUserInfo from "../../hooks/useGetUserInfo";

const { Text } = Typography;

/**
 *
 * @param {object} props
 * @param {string} props.title
 * @param {'credit'|'quota' | 'point'} props.type
 * @param {import("antd").ProgressProps['format']} props.format
 * @returns
 */
const CardProgress = ({ title, type, format }) => {
  const { loginState } = useGetUserInfo();

  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Text strong style={{ fontSize: 18 }}>
        {title}
      </Text>
      <Progress
        type="circle"
        percent={(loginState?.[type] / 1_000_000) * 100}
        format={format}
      />
    </Space>
  );
};
const CreditQuota = () => {
  const { loginState } = useGetUserInfo();

  const data = [
    {
      title: "Credit",
      type: "credit",
      format: () => (
        <>
          <span>Rp </span>
          <CountUp end={loginState?.credit} duration={1} />
        </>
      ),
    },
    {
      title: "Point",
      type: "point",
      format: () => formatNumber(loginState?.point) || 0,
    },
    {
      title: "Quota",
      type: "quota",
      format: () => (
        <>
          <CountUp end={formatQuota(loginState?.quotaAmount)} duration={1} />{" "}
          <span>GB</span>
        </>
      ),
    },
  ];

  return (
    <Row justify="center" style={{ width: "100%" }}>
      {data?.map((d) => (
        <Col span={8} style={{ textAlign: "center" }} key={d?.type}>
          <CardProgress {...d} />
        </Col>
      ))}
    </Row>
  );
};
export default CreditQuota;
