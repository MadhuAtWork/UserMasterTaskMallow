import React from "react";
import { Row, Col, Card, Avatar, Button, Space, Popover } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserCardView = ({ data, onEdit, onDelete }) => (
  <Row gutter={[16, 16]} className="card-container">
    {data.map((item) => (
      <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
        <Popover
          content={
            <Space>
              <Button type="link" onClick={() => onEdit(item)}>
                <EditOutlined style={{ fontSize: "30px" }}></EditOutlined>
              </Button>
              <Button type="link" danger onClick={() => onDelete(item.id)}>
                <DeleteOutlined style={{ fontSize: "30px" }}></DeleteOutlined>
              </Button>
            </Space>
          }
          trigger="hover"
          placement="center"
          className="Popover"
        >
          <Card title={item.title} bordered={true} className="hover-card">
            <Avatar
              src={item.avatar}
              size={100}
              style={{
                display: "block",
                margin: "0 auto",
                marginBottom: "10px",
              }}
            />
            <h3
              style={{ textAlign: "center" }}
            >{`${item.first_name}  ${item.last_name}`}</h3>
            <p style={{ textAlign: "center" }}>{item.email}</p>
          </Card>
        </Popover>
      </Col>
    ))}
  </Row>
);

export default UserCardView;
