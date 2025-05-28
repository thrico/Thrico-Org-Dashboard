import { DeleteOutlined, DragOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { Button, Card, Checkbox, Popconfirm, Select, Space } from "antd";
import { RenderQuestionEditor } from "./RenderQuestionEditor";
import { CSS } from "@dnd-kit/utilities";
import {
  AddOptionFn,
  RemoveQuestionFn,
  UpdateOptionFn,
  UpdateQuestionFn,
} from "../../../../store/ts-types";

export function SortableQuestionItem({
  question,
  index,
  updateQuestion,
  updateOption,
  addOption,
  removeQuestion,
  options, // <-- Add options to the props type below
}: {
  question: any;
  index: number;
  updateQuestion: UpdateQuestionFn;
  updateOption: UpdateOptionFn;
  addOption: AddOptionFn;
  removeQuestion: RemoveQuestionFn;
  options: { key: string; label: string }[]; // <-- Add this line
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

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        style={{
          marginBottom: 16,
          border: isDragging ? "2px dashed #1890ff" : "1px solid #d9d9d9",
          boxShadow: isDragging
            ? "0 8px 24px rgba(0,0,0,0.12)"
            : "0 1px 3px rgba(0,0,0,0.12)",
        }}
        extra={
          <Space>
            <div
              {...attributes}
              {...listeners}
              style={{
                cursor: "grab",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                color: "#8c8c8c",
                borderRadius: "4px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                e.currentTarget.style.color = "#1890ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#8c8c8c";
              }}
            >
              <DragOutlined style={{ fontSize: 16 }} />
            </div>
            <Popconfirm
              title="Are you sure you want to delete this question?"
              description="This action cannot be undone."
              onConfirm={() => removeQuestion(question.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>

            <Checkbox
              checked={question.required}
              onChange={(e) =>
                updateQuestion(question.id, "required", e.target.checked)
              }
            >
              Required
            </Checkbox>
          </Space>
        }
        title={
          <Space>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#1890ff",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </div>
            <Select
              value={question.type}
              style={{ width: 180 }}
              onChange={(value) => updateQuestion(question.id, "type", value)}
              options={options.map((opt) => ({
                value: opt.key,
                label: opt.label,
              }))}
            />
          </Space>
        }
      >
        {RenderQuestionEditor(
          question,
          updateQuestion,
          updateOption,
          addOption
        )}
      </Card>
    </div>
  );
}
