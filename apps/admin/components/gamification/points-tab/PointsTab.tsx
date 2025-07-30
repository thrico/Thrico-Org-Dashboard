// File: components/PointsTab.tsx
import { useState } from "react";
import { Card, Space, Button, Typography, Badge, Modal } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PointRuleForm } from "./PointRuleForm";
import { mockPointRules } from "../mockData";
import {
  useCreatePointRule,
  usePointRules,
  useUpdatePointRule,
} from "../../../graphql/actions/gamification";
import { EditRuleForm } from "./EditRules";

const { Text } = Typography;

export default function PointsTab({}) {
  const { data } = usePointRules();

  const [pointRules, setPointRules] = useState(mockPointRules);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState<any | null>(null);
  const [add, { loading, data: rules }] = useCreatePointRule({
    onCompleted: () => {
      if (rules?.createPointRule) {
        setModalVisible(false);
        setEditingRule(null);
      }
    },
    onError: (error) => {
      console.error("Error creating point rule:", error);
    },
  });

  const [edit, { loading: updateLoading }] = useUpdatePointRule({
    onCompleted: () => {
      if (rules?.updatePointRule) {
        setModalVisible(false);
        setEditingRule(null);
      }
    },
    onError: (error) => {
      console.error("Error creating point rule:", error);
    },
  });
  const handleSave = (values: any) => {
    if (editingRule) {
      setPointRules(
        pointRules.map((r: any) =>
          r.id === editingRule.id ? { ...editingRule, ...values } : r
        )
      );
    } else {
      setPointRules([...pointRules, { ...values, id: Date.now() }]);
    }
    add({
      variables: {
        input: {
          ...values,
          points: Number(values.points),
        },
      },
    })
      .then(() => {
        // Handle success
      })
      .catch((error) => {
        console.error("Error saving point rule:", error);
      });
    setEditingRule(null);
  };

  const handleEdit = (values: any) => {
    edit({
      variables: {
        input: {
          ...values,
          points: Number(values.points),
        },
      },
    });
  };

  const deletePointRule = (id: number) => {
    setPointRules(pointRules.filter((r: any) => r.id !== id));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Modal
        title={editingRule ? "Edit Point Rule" : "Add Point Rule"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingRule(null);
        }}
        footer={null}
      >
        {editingRule && (
          <EditRuleForm
            initialValues={editingRule || { trigger: "recurring", points: 0 }}
            onSubmit={handleEdit}
            loading={loading}
            onCancel={() => {
              setModalVisible(false);
              setEditingRule(null);
            }}
          />
        )}
        {!editingRule && (
          <PointRuleForm
            initialValues={editingRule || { trigger: "recurring", points: 0 }}
            onSubmit={handleSave}
            loading={updateLoading}
            onCancel={() => {
              setModalVisible(false);
              setEditingRule(null);
            }}
          />
        )}
      </Modal>

      <Card
        title="Current Point Rules"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            New Rule
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {data?.pointRules.map((rule: any) => (
            <div
              key={rule.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Space>
                  <Badge
                    color={rule.trigger === "first_time" ? "green" : "blue"}
                    text={rule.trigger}
                  />
                  <Text strong>
                    {rule.module} / {rule.action}
                  </Text>
                  <Text type="warning">+{rule.points} pts</Text>
                </Space>
                {rule.description && (
                  <div style={{ marginLeft: 16 }}>
                    <Text type="secondary">{rule.description}</Text>
                  </div>
                )}
              </div>
              <Space>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditingRule(rule);
                    setModalVisible(true);
                  }}
                />
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deletePointRule(rule.id)}
                />
              </Space>
            </div>
          ))}
        </Space>
      </Card>
    </Space>
  );
}
