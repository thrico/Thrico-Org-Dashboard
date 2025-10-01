import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Progress,
  List,
  Divider,
  Modal,
} from "antd";
import { useGetListingStatsById } from "../../graphql/actions/listing";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface AnalyticsProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const Analytics = ({ id, open, onClose }: AnalyticsProps) => {
  const { data, loading } = useGetListingStatsById({
    variables: { input: { listingId: id } },
  });
  const stats = data?.getListingStatsById;
  return (
    <Modal
      footer={null}
      loading={loading}
      width={1000}
      open={open}
      onClose={() => onClose()}
    >
      <div style={{ padding: 24 }}>
        <Typography.Title level={4}>
          Listing Analytics - 1999 Yamaha 135
        </Typography.Title>
        <Text type="secondary">
          Detailed performance metrics for your listing
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Views"
                value={stats?.totalViews || 0}
                suffix={
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    +{stats?.weeklyViewsDiff} this week
                  </Text>
                }
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Unique Views"
                value={stats?.uniqueViews || 0}
                suffix={
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    +{stats?.lastWeekViews} from last month
                  </Text>
                }
              />
            </Card>
          </Col>
          {/* <Col span={6}>
            <Card>
              <Statistic
                title="Saves"
                value={12}
                suffix={
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    +5% save rate
                  </Text>
                }
              />
            </Card>
          </Col> */}
          <Col span={8}>
            <Card>
              <Statistic
                title="Contact Clicks"
                value={stats?.totalContactClicks || 0}
                suffix={
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {stats?.contactRate}% contact rate
                  </Text>
                }
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card variant="borderless">
              <Statistic
                title="Views This Week"
                value={stats?.thisWeekViews || 0}
                precision={2}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card variant="borderless">
              <Statistic
                title="Views Last Week"
                value={stats?.lastWeekViews || 0}
                precision={2}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Analytics;
