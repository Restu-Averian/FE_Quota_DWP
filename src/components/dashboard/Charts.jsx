import { Column } from "@ant-design/plots";
import useFetch from "../../hooks/useFetch";
import { useEffect, useMemo, useState } from "react";

const Charts = () => {
  const fetch = useFetch();

  const [quotaState, setQuotaState] = useState([]);

  const getQuota = () => {
    fetch({ method: "get" }, "quota")?.then(({ data }) => {
      setQuotaState(data);
    });
  };

  const config = useMemo(() => {
    return {
      data: quotaState,
      xField: "quotaAmount",
      yField: "purchaseCount",
      label: {
        // 可手动配置 label 数据标签位置
        position: "middle",
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
    };
  }, [quotaState]);

  useEffect(() => {
    getQuota();
  }, []);

  return <Column {...config} />;
};
export default Charts;
