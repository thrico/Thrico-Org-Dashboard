"use client";

import { useState } from "react";

import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  Flex,
  Form,
  Input,
  Layout,
  Menu,
  Space,
  Tabs,
  Typography,
} from "antd";

import Settings from "./Settings";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableQuestionItem } from "./editor/SortableQuestionItem";
import { Sidebar } from "./editor/Sidebar";
import { options } from "./Options";
import Preview from "./preview/Preview";
import { Content } from "antd/es/layout/layout";
import { useFormStore } from "../../../store/useFormStore";
import { Question } from "../../../store/ts-types";

const { TextArea } = Input;
const { TabPane } = Tabs;

interface NewFormPageProps {
  add: () => void;
}

export default function NewFormPage({}: NewFormPageProps) {
  const {
    formTitle,
    formDescription,
    questions,
    formSettings,
    setFormTitle,
    setFormDescription,
    addQuestion,
    updateQuestion,
    duplicateQuestion,
    updateOption,
    addOption,
    removeQuestion,
    updateFormSetting,
    reorderQuestions,
  } = useFormStore();

  const questionTypeMenu = (
    <Menu
      onClick={({ key }) => addQuestion(key as Question["type"])}
      items={options}
    />
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      if (active.id !== over?.id) {
        const oldIndex = questions.findIndex((item) => item.id === active?.id);
        const newIndex = questions.findIndex((item) => item.id === over?.id);
        reorderQuestions(oldIndex, newIndex);
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [tab, setActiveTab] = useState("edit");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        <Tabs defaultActiveKey="edit" onChange={setActiveTab}>
          <TabPane tab="Edit" key="edit">
            <Flex gap={24}>
              <Card
                extra={
                  <div style={{ textAlign: "center" }}>
                    <Dropdown overlay={questionTypeMenu} trigger={["click"]}>
                      <Button type="dashed" icon={<PlusOutlined />}>
                        Add Question <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                }
                style={{ width: "20%" }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={questions.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {questions.map((question, index) => (
                        <Sidebar
                          key={question.id}
                          question={question}
                          index={index}
                          duplicateQuestion={duplicateQuestion}
                          updateQuestion={updateQuestion}
                          updateOption={updateOption}
                          addOption={addOption}
                          removeQuestion={removeQuestion}
                          options={options}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </Space>
              </Card>
              <Space direction="vertical" size="large" style={{ width: "80%" }}>
                <Card>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Form.Item label="Form Title">
                      <Input
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        style={{ fontSize: 20, fontWeight: "bold" }}
                      />
                    </Form.Item>
                    <Form.Item label="Description (Optional)">
                      <TextArea
                        placeholder="Enter a description for your form"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        rows={4}
                      />
                    </Form.Item>
                  </Space>
                </Card>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={questions.map((q) => q.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {questions.map((question, index) => (
                      <SortableQuestionItem
                        key={question.id}
                        question={question}
                        index={index}
                        updateQuestion={updateQuestion}
                        updateOption={updateOption}
                        addOption={addOption}
                        removeQuestion={removeQuestion}
                        options={options}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </Space>
            </Flex>
          </TabPane>

          <TabPane tab="Preview" key="preview">
            <Preview
              formTitle={formTitle}
              formDescription={formDescription}
              questions={questions}
              formSettings={formSettings}
            />
          </TabPane>

          <TabPane tab="Settings" key="settings">
            <Settings
              formSettings={formSettings}
              updateFormSetting={updateFormSetting}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
