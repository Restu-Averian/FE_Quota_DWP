import {
  Button,
  Checkbox,
  Col,
  Flex,
  InputNumber,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import TitlePage from "../../components/lib/TitlePage";
import useFetch from "../../hooks/useFetch";
import { Fragment, useEffect, useMemo, useState } from "react";
import { formatQuota } from "../../helpers";
import { TrophyOutlined } from "@ant-design/icons";
import useGetUserInfo from "../../hooks/useGetUserInfo";

const { Text } = Typography;
const DetailQuota = () => {
  const { id } = useParams();

  const { loginState } = useGetUserInfo();

  const navigate = useNavigate();

  const [detailQuota, setDetailQuota] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [usePoint, setUsePoint] = useState(false);
  const [pointUseVal, setPointUseVal] = useState(0);

  const fetch = useFetch();

  const [modal, modalCtx] = Modal.useModal();

  const isErrorPointUse = useMemo(() => {
    return pointUseVal > loginState?.point;
  }, [pointUseVal, loginState?.point]);

  const getDetailQuota = () => {
    setLoading(true);

    fetch({ method: "GET" }, `quota?id=${id}`)
      ?.then(({ data }) => {
        console.log("s ", data);
        setDetailQuota(data?.[0]);
      })
      ?.finally(() => {
        setLoading(false);
      });
  };

  const onUpdatePurchaseAPI = async () => {
    const { quotaAmount, price, point, period } = detailQuota;

    try {
      const { data } = await fetch(
        {
          method: "put",
          data: {
            ...loginState,
            quotaAmount: loginState?.quotaAmount + quotaAmount,
            credit: loginState?.credit - (price - pointUseVal),
            point: loginState?.point - pointUseVal + point,
            period: loginState?.period + period,
            purchaseCount: loginState?.purchaseCount + 1,
          },
        },
        `customer/${loginState?.id}`
      );
      return data;
    } catch (err) {
      return err;
    }
  };

  const onUpdateTransactionAPI = async () => {
    const { quotaAmount, price, point, period } = detailQuota;

    try {
      const { data } = await fetch(
        {
          method: "post",
          data: {
            customer_id: loginState?.id,
            customerName: loginState?.customerName,
            quotaAmount: loginState?.quotaAmount + quotaAmount,
            point: loginState?.point - pointUseVal + point,
            period: loginState?.period + period,
            price: price - pointUseVal,
          },
        },
        `transaction`
      );
      return data;
    } catch (err) {
      return err;
    }
  };

  const onUpdateQuotaAPI = async () => {
    try {
      const { data } = await fetch(
        {
          method: "put",
          data: {
            ...detailQuota,
            purchaseCount: detailQuota?.purchaseCount + 1,
          },
        },
        `quota/${detailQuota?.id}`
      );
      return data;
    } catch (err) {
      return err;
    }
  };

  const onPurchase = () => {
    modal.confirm({
      title: `You would buy ${formatQuota(detailQuota?.quotaAmount)} GB`,
      okText: "Purchase",
      onOk: () => {
        setLoading(true);

        onUpdatePurchaseAPI()
          ?.then(() => {
            onUpdateTransactionAPI()?.then(() => {
              onUpdateQuotaAPI()?.then(() => {
                navigate("/");
              });
            });
          })
          ?.finally(() => {
            setLoading(false);
          });
      },
    });
  };

  useEffect(() => {
    getDetailQuota();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Row gutter={[32, 32]}>
        {modalCtx}
        <Col span={24}>
          <TitlePage text="Detail Quota" backUrl="/quota" />
        </Col>

        <Col span={24}>
          {Object.keys(detailQuota || "{}")?.length > 0 ? (
            <Row gutter={[32, 32]}>
              <Col span={24} style={{ textAlign: "center" }}>
                <Space style={{ width: "100%" }} direction="vertical">
                  <Text type="secondary">Quota</Text>
                  <Text style={{ fontWeight: "bolder", fontSize: 36 }}>
                    {formatQuota(detailQuota?.quotaAmount)} GB
                  </Text>
                </Space>
              </Col>

              <Col span={24} style={{ textAlign: "center" }}>
                <Space style={{ width: "50%" }} direction="vertical" size={24}>
                  <Flex justify="space-between">
                    <Text strong>Period</Text>
                    <Text>{detailQuota?.period} Days</Text>
                  </Flex>

                  <Flex justify="space-between">
                    <Text strong>Point</Text>
                    <Text>
                      <span>
                        + <TrophyOutlined />{" "}
                      </span>
                      {detailQuota?.point}
                    </Text>
                  </Flex>

                  <Flex justify="space-between">
                    <Text strong>Price</Text>
                    <Text>Rp {detailQuota?.price}</Text>
                  </Flex>

                  <Flex justify="end">
                    <Checkbox
                      onChange={({ target: { checked } }) => {
                        setUsePoint(checked);
                      }}
                    >
                      Use Point
                    </Checkbox>
                  </Flex>
                  {usePoint && (
                    <Flex justify="space-between">
                      <Text strong>Point Used</Text>
                      <Space direction="vertical">
                        <InputNumber
                          value={pointUseVal}
                          onChange={(val) => {
                            setPointUseVal(val);
                          }}
                          {...(isErrorPointUse && {
                            status: "error",
                          })}
                        />
                        {isErrorPointUse && (
                          <Text type="danger">Poin tidak mencukupi</Text>
                        )}
                      </Space>
                    </Flex>
                  )}
                </Space>
              </Col>
            </Row>
          ) : (
            <Fragment />
          )}
        </Col>

        <Col span={24}>
          <Button
            loading={isLoading}
            disabled={isErrorPointUse}
            block
            type="primary"
            {...(!isErrorPointUse && {
              onClick: () => {
                onPurchase();
              },
            })}
          >
            Purchase
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};
export default DetailQuota;
