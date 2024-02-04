import { Table } from "antd";

/**
 *
 * @param {import("antd").TableColumnProps} props
 * @returns
 */
const ListingColumns = ({ ...props }) => {
  return <Table.Column {...props} />;
};
export default ListingColumns;
