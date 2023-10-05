import { Image, Table, Tag } from "antd";

const ItemTable = ({
  data,
  columns,
  scroll,
}: {
  data:
    | {
        id: string;
        description: string | null;
        item: string | null;
        type: string;
        status: string;
        imageUrl: string;
        studentId: string | null;
        donorId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
  columns: any;
  scroll: number;
}) => {
  return (
    <div className=" mx-5 mb-5 flex-1 overflow-hidden rounded bg-white">
      <Table
        dataSource={data || []}
        columns={columns}
        pagination={false}
        scroll={{ y: scroll }}
      />
    </div>
  );
};

export default ItemTable;
