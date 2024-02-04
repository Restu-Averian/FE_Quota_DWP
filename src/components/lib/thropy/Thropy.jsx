import { TrophyOutlined } from "@ant-design/icons";
import { Space, Tooltip, Typography } from "antd";
import { useMemo } from "react";
import CountUp from "react-countup";

const { Text } = Typography;

const Thropy = ({ value }) => {
  const thropyData = useMemo(() => {
    if (value > 500 && value <= 1000) {
      return {
        name: "Silver",
        color: "grey",
      };
    } else if (value > 1000) {
      return {
        name: "Platinum",
        color: "cyan",
      };
    }
    return {
      name: "Bronze",
      color: "orange",
    };
  }, [value]);

  console.log("s : ", thropyData, value);

  return (
    <Space>
      <Tooltip title={thropyData?.name}>
        <TrophyOutlined style={{ color: thropyData?.color }} />
      </Tooltip>
      <Text>
        <CountUp end={value} duration={0.8} />
      </Text>
    </Space>
  );
};
export default Thropy;
