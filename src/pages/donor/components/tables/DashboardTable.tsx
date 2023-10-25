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
    <div className=" mx-1 mb-1 flex-1 overflow-hidden rounded-xl bg-white sm:mx-5 sm:mb-5">
      <Table
        className="flex sm:hidden"
        size="small"
        dataSource={data || []}
        columns={columns}
        pagination={false}
        scroll={{ y: scroll }}
      />
      <Table
        className="hidden sm:flex"
        dataSource={data || []}
        columns={columns}
        pagination={false}
        scroll={{ y: scroll }}
      />
    </div>
  );
};

export default ItemTable;
