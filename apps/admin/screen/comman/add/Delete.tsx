import React from "react";
import { Modal } from "antd";

const Delete = ({
  isModalOpen,
  handleCancel,
  id,
  title,
  deleteCategory,
  loading,
}) => {
  const deleteCat = () => {
    deleteCategory(id);
  };

  return (
    <>
      <Modal
        confirmLoading={loading}
        okText="Delete"
        title={`Delete this ${title}?`}
        open={isModalOpen}
        onOk={deleteCat}
        onCancel={handleCancel}
      >
        It'll be gone forever and we won't be able to recover it.
      </Modal>
    </>
  );
};

export default Delete;
