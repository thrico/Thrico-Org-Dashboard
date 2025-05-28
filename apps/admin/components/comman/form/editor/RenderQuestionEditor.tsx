import { Button, Checkbox, Form, Input, Select, Space } from "antd";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AddOptionFn,
  Question,
  UpdateOptionFn,
} from "../../../../store/ts-types";

export const RenderQuestionEditor = (
  question: Question,
  updateQuestion: any,
  updateOption: UpdateOptionFn,
  addOption: AddOptionFn
) => {
  switch (question.type) {
    case "SHORT_TEXT":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item required={question.required} label="Question">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Max Length">
            <Input
              type="number"
              value={question.maxLength || 255}
              onChange={(e) =>
                updateQuestion(question.id, "maxLength", Number(e.target.value))
              }
            />
          </Form.Item>
        </Space>
      );

    case "LONG_TEXT":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item required={question.required} label="Question">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Max Length">
            <Input
              type="number"
              value={question.maxLength || 4000}
              onChange={(e) =>
                updateQuestion(question.id, "maxLength", Number(e.target.value))
              }
            />
          </Form.Item>
        </Space>
      );

    case "EMAIL":
      return (
        <Form.Item label="Question">
          <Input
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </Form.Item>
      );

    case "PHONE":
      return (
        <Form.Item label="Question">
          <Input
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </Form.Item>
      );

    case "WEBSITE":
      return (
        <Form.Item label="Question">
          <Input
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </Form.Item>
      );

    case "NUMBER":
      return (
        <Form.Item label="Question">
          <Input
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </Form.Item>
      );

    case "OPINION_SCALE":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item label="Question">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />
          </Form.Item>
          <Space style={{ width: "100%" }}>
            <Form.Item label="Min Value">
              <Input
                type="number"
                max={1}
                value={question.min || 1}
                onChange={(e) =>
                  updateQuestion(question.id, "min", Number(e.target.value))
                }
              />
            </Form.Item>
            <Form.Item label="Max Value">
              <Input
                type="number"
                value={question.max ?? 10}
                min={1}
                max={10}
                onChange={(e) =>
                  updateQuestion(
                    question.id,
                    "max",
                    Math.min(10, Math.max(1, Number(e.target.value)))
                  )
                }
              />
            </Form.Item>
          </Space>
          <Space style={{ width: "100%" }}>
            <Form.Item label="Start Label">
              <Input
                value={question.labels?.start || "Not at all likely"}
                onChange={(e) =>
                  updateQuestion(question.id, "labels", {
                    ...question.labels,
                    start: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="End Label">
              <Input
                value={question.labels?.end || "Extremely likely"}
                onChange={(e) =>
                  updateQuestion(question.id, "labels", {
                    ...question.labels,
                    end: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Space>
        </Space>
      );

    case "MULTIPLE_CHOICE":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item label="Question">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Options">
            {question?.options?.map((option, index) => (
              <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
                <Input
                  value={option}
                  onChange={(e) =>
                    updateOption(question?.id, index, e.target.value)
                  }
                  style={{ width: "100%" }}
                />
                {(question?.options?.length ?? 0) > 2 && (
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      const newOptions = question?.options?.filter(
                        (_, i) => i !== index
                      );
                      updateQuestion(question.id, "options", newOptions);
                    }}
                  />
                )}
              </Space>
            ))}
            <Button
              type="dashed"
              onClick={() => addOption(question?.id)}
              style={{ width: "100%" }}
              icon={<PlusOutlined />}
            >
              Add Option
            </Button>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={question.allowMultiple}
              onChange={(e) =>
                updateQuestion(question.id, "allowMultiple", e.target.checked)
              }
            >
              Allow multiple selections
            </Checkbox>
          </Form.Item>
        </Space>
      );

    case "ISOPTION":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item label="Question">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Options">
            {question?.options?.map((option, index) => (
              <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
                <Input
                  value={option}
                  onChange={(e) =>
                    updateOption(question.id, index, e.target.value)
                  }
                  style={{ width: "100%" }}
                />
                {(question?.options?.length ?? 0) > 2 && (
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      const newOptions = question?.options?.filter(
                        (_, i) => i !== index
                      );
                      updateQuestion(question.id, "options", newOptions);
                    }}
                  />
                )}
              </Space>
            ))}
            <Button
              type="dashed"
              onClick={() => addOption(question.id)}
              style={{ width: "100%" }}
              icon={<PlusOutlined />}
            >
              Add Option
            </Button>
          </Form.Item>
        </Space>
      );

    case "RATING":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item label="Question">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Scale">
            <Select
              value={question.scale?.toString() || "5"}
              onChange={(value) =>
                updateQuestion(question.id, "scale", Number.parseInt(value))
              }
              options={[
                { value: "5", label: "1-5" },
                { value: "10", label: "1-10" },
              ]}
            />
          </Form.Item>
        </Space>
      );

    case "DROPDOWN":
      return (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item label="Question">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, "question", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Options">
            {question?.options?.map((option, index) => (
              <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
                <Input
                  value={option}
                  onChange={(e) =>
                    updateOption(question.id, index, e.target.value)
                  }
                  style={{ width: "100%" }}
                />
                {(question?.options?.length ?? 0) > 2 && (
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      const newOptions = question?.options?.filter(
                        (_, i) => i !== index
                      );
                      updateQuestion(question.id, "options", newOptions);
                    }}
                  />
                )}
              </Space>
            ))}
            <Button
              type="dashed"
              onClick={() => addOption(question.id)}
              style={{ width: "100%" }}
              icon={<PlusOutlined />}
            >
              Add Option
            </Button>
          </Form.Item>
        </Space>
      );

    case "DATE":
      return (
        <Form.Item label="Question">
          <Input
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </Form.Item>
      );

    case "TIME":
      return (
        <Form.Item label="Question">
          <Input
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </Form.Item>
      );

    case "YES-NO":
      return (
        <Form.Item label="Question">
          <Input
            value={question.question}
            onChange={(e) =>
              updateQuestion(question.id, "question", e.target.value)
            }
          />
        </Form.Item>
      );

    default:
      return null;
  }
};
