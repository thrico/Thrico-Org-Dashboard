import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { Button, Card, Dropdown, Flex, Space, Tag, Typography } from "antd";

import { CSS } from "@dnd-kit/utilities";
import { MenuProps } from "antd/lib";
import { ReactNode } from "react";
import {
  AddOptionFn,
  DuplicateQuestionFn,
  RemoveQuestionFn,
  UpdateOptionFn,
  UpdateQuestionFn,
} from "../../../../store/ts-types";

type NewType = {
  key: string;
  label: string;
  icon: ReactNode;
};

export function Sidebar({
  question,
  index,
  updateQuestion,
  duplicateQuestion,
  removeQuestion,
  options, // <-- Add options to the props type below
}: {
  question: any;
  index: number;
  updateQuestion: UpdateQuestionFn;
  updateOption: UpdateOptionFn;
  addOption: AddOptionFn;
  duplicateQuestion: DuplicateQuestionFn;
  removeQuestion: RemoveQuestionFn;
  options: NewType[]; // <-- Add this line
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Duplicate",
      icon: <Typography.Text copyable />,
      onClick: () => {
        duplicateQuestion(question.id);
      },
    },
    {
      key: "2",
      label: "Delete",
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        removeQuestion(question.id);
      },
    },
  ];
  return (
    <div ref={setNodeRef} style={style}>
      <Card
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          marginBottom: 8,
          border: isDragging ? "2px dashed #1890ff" : "1px solid #d9d9d9",
          boxShadow: isDragging
            ? "0 8px 24px rgba(0,0,0,0.12)"
            : "0 1px 3px rgba(0,0,0,0.12)",
        }}
      >
        <Flex justify="space-between" align="center">
          <Tag color="blue" style={{ marginRight: 8, padding: "0 8px" }}>
            <Flex gap={20} style={{ padding: 5 }}>
              {options.find((opt) => opt.key === question.type)?.icon}
              <span> {index}</span>
            </Flex>
          </Tag>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button type="dashed" icon={<MoreOutlined />} />
          </Dropdown>
        </Flex>
      </Card>
    </div>
  );
}
