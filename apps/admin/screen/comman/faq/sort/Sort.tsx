import React, { useState } from "react";
import { Button, Form, FormProps, Input, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addFaq, getModuleFaq } from "../../../../graphql/actions/faq";
import { useForm } from "antd/es/form/Form";
import { FaSortAlphaDown } from "react-icons/fa";
import IconView from "../../IconView";
import Drag from "./Drag";

const Sort = ({ type, data }) => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  type FieldType = {
    title?: string;
    description?: string;
  };

  const onCompleted = () => {
    handleCancel();
    form.resetFields();
  };
  const [add, { loading }] = addFaq({
    onCompleted,
    module: type,
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    add({
      variables: {
        input: {
          ...values,
          module: "communities",
        },
      },
    });
  };

  return (
    <>
      <Button icon={<FaSortAlphaDown />} onClick={showModal}>
        Sort
      </Button>
      <Modal
        footer={[]}
        width={800}
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Drag data={data} type={type} />
      </Modal>
    </>
  );
};

export default Sort;
