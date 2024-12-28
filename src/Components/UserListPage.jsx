import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  editUser,
  createUser,
} from "../Components/ReduxComponent/userSlice";
import { Layout, Typography, Button, Row, Col } from "antd";
import Navbar from "./Navbar";
import UserTableView from "./UserTableView";
import UserCardView from "./UserCardView";
import SearchBar from "./SearchBar";
import UserModal from "./UserModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { TableOutlined, CreditCardOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Content, Footer } = Layout;

const UserListPage = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.users);

  const [filteredData, setFilteredData] = useState(list);
  const [tabFlag, setTabFlag] = useState("table");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(list);
  }, [list]);

  const handleTabChange = (value) => setTabFlag(value);

  const handleSearch = (value) => {
    setSearchValue(value);
    setFilteredData(
      list.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  const handleDeleteConfirm = (userId) => {
    setDeleteUserId(userId);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId));
    }
    setIsDeleteModalVisible(false);
  };

  const handleEdit = (record) => {
    setFormData(record);
    setIsCreateMode(false);
    setIsModalVisible(true);
  };

  const handleCreateUser = () => {
    setFormData({ first_name: "", last_name: "", email: "", avatar: "" });
    setIsCreateMode(true);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (!formData.first_name) {
      alert("Please Enter First Name.");
      return;
    }
    if (!formData.last_name) {
      alert("Please Enter Last Name.");
      return;
    }
    if (!formData.email) {
      alert("Please Enter Email.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please Enter Valid Email.");
      return;
    }
    if (!formData.avatar) {
      alert("Please Enter Profile Image Link.");
      return;
    }

    // Validate the avatar URL
    try {
      const avatar = new URL(formData.avatar);
    } catch (error) {
      alert("Please Enter Valid Profile Image Link.");
      return;
    }

    if (isCreateMode) {
      dispatch(createUser(formData));
    } else {
      dispatch(editUser(formData));
    }

    setIsModalVisible(false);
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalCancel = () => setIsModalVisible(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading users</div>;
  }

  return (
    <Layout>
      <Navbar />
      <Content style={{ margin: 30 }}>
        <Title level={2}>User</Title>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 20 }}
        >
          <Col>
            <Row gutter={[16, 16]}>
              <Col>
                <div
                  onClick={() => handleTabChange("table")}
                  className={tabFlag === "table" ? "activeTab" : "inactiveTab"}
                >
                  <TableOutlined style={{ marginRight: 5 }} />
                  <div>Table</div>
                </div>
              </Col>
              <Col>
                <div
                  onClick={() => handleTabChange("card")}
                  className={tabFlag === "card" ? "activeTab" : "inactiveTab"}
                >
                  <CreditCardOutlined style={{ marginRight: 5 }} />
                  <div>Card</div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <SearchBar
              value={searchValue}
              onSearch={handleSearch}
              onCreate={handleCreateUser}
            />
          </Col>
        </Row>
        {tabFlag === "table" ? (
          <UserTableView
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        ) : (
          <UserCardView
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        )}
      </Content>
      <UserModal
        visible={isModalVisible}
        formData={formData}
        isCreateMode={isCreateMode}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        onChange={handleInputChange}
      />
      <DeleteConfirmModal
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
      <Footer
        style={{
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#001529",
          padding: "10px 0",
          zIndex: 1000,
          color: "white",
        }}
      >
        Mallow Technologies ©2024 Created by Madhu Sudhan Choppari
      </Footer>
    </Layout>
  );
};

export default UserListPage;
