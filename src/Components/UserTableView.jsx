import React from "react";
import { Table, Button, Avatar } from "antd";

const UserTableView = ({
  data,
  total,
  currentPage,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} size="large" />,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action(s)",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => onEdit(record)}
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white", border: "none" }}
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={{
        current: currentPage,
        pageSize: 5,
        total: total,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} `,
        onChange: onPageChange,
      }}
    />
  );
};

export default UserTableView;
