import React from "react";
import { Modal, Form, Input } from "antd";

const UserModal = ({
  visible,
  formData,
  isCreateMode,
  onOk,
  onCancel,
  onChange,
}) => {
  return (
    <Modal
      title={isCreateMode ? "Create User" : "Edit User"}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText={isCreateMode ? "Create" : "Save"}
      cancelText="Cancel"
    >
      <Form layout="vertical">
        <Form.Item label="First Name">
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={(e) => {
              const userInput = e.target.value;
              // /^[a-zA-Z0-9\s.-]+$/
              if (/^[a-zA-Z\s._-]*$/.test(userInput)) {
                onChange(e.target.name, e.target.value);
              }
            }}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={(e) => {
              const userInput = e.target.value;
              if (/^[a-zA-Z\s._-]*$/.test(userInput)) {
                onChange(e.target.name, e.target.value);
              }
            }}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            value={formData.email}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Profile Image Link">
          <Input
            name="avatar"
            value={formData.avatar}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
