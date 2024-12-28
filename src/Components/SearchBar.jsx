import React from "react";
import { Input, Button, Form } from "antd";

const SearchBar = ({ value, onSearch, onCreate }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Form.Item label="Search" style={{ marginRight: 10 }}>
      <Input value={value} onChange={(e) => onSearch(e.target.value)} />
    </Form.Item>
    <Button
      type="primary"
      onClick={onCreate}
      style={{ marginBottom: 35, marginRight: 10 }}
    >
      Create User
    </Button>
  </div>
);

export default SearchBar;
