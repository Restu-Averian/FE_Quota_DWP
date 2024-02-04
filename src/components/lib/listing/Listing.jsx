import { Col, Row, Spin, Table } from "antd";
import ListingColumns from "./ListingColumn";
import useFetch from "../../../hooks/useFetch";
import { API_URL } from "../../../constants";
import { useEffect, useState } from "react";

/**
 * @typedef ListingProps
 * @property {string} endpoint
 * @property {import("react").ReactNode[]} [customFilter]
 * @property {(data:string[])=>string[]} [customFetch]
 */

/**
 * @param {ListingProps & import("antd").TableProps} props
 * @returns
 */
const Listing = ({
  children,
  customFilter,
  endpoint,
  customFetch,
  ...props
}) => {
  const fetch = useFetch();

  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEndpoint = () => {
    if (endpoint) {
      setIsLoading(true);
      fetch({
        url: `${API_URL}/${endpoint}`,
      })
        ?.then(({ data }) => {
          if (typeof customFetch !== "undefined") {
            const customData = customFetch(data);
            setDataTable(customData);
          } else {
            setDataTable(data);
          }
        })
        ?.finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchEndpoint();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row>
          {customFilter?.map((filter, idx) => (
            <Col span={customFilter?.length / 2} key={idx}>
              {filter}
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <Spin spinning={isLoading}>
          <Table dataSource={dataTable} {...props}>
            {children}
          </Table>
        </Spin>
      </Col>
    </Row>
  );
};

Listing.Column = ListingColumns;
export default Listing;
