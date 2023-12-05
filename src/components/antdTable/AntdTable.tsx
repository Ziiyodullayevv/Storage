import "./antdTable.scss";
import { Table } from "antd";

type Props = {
  columns: object[];
  dataSource: object[];
};

const AntdTable = ({ columns, dataSource }: Props) => {
  return (
    <div>
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
};

export default AntdTable;
