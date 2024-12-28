import React from "react";
import { Modal } from "antd";

const DeleteConfirmModal = ({ visible, onOk, onCancel }) => (
  <Modal
    title="Confirm Delete"
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText="Delete"
    cancelText="Cancel"
    okButtonProps={{ danger: true }}
  >
    <p>Are you sure you want to delete this user?</p>
  </Modal>
);

export default DeleteConfirmModal;
