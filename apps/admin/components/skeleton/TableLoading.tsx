import { Card, Col, Row, Skeleton, Space } from "antd";

export default function TableLoading() {
  return (
    <div style={{ padding: "24px" }}>
      <Card style={{ marginTop: 24 }}>
        <Skeleton active paragraph={{ rows: 0 }} />

        <div className="ant-table">
          <div className="ant-table-container">
            <div className="ant-table-content">
              <table style={{ width: "100%" }}>
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-cell">
                      <Skeleton.Input
                        style={{ width: 100 }}
                        active
                        size="small"
                      />
                    </th>
                    <th className="ant-table-cell">
                      <Skeleton.Input
                        style={{ width: 100 }}
                        active
                        size="small"
                      />
                    </th>
                    <th className="ant-table-cell">
                      <Skeleton.Input
                        style={{ width: 100 }}
                        active
                        size="small"
                      />
                    </th>
                    <th className="ant-table-cell">
                      <Skeleton.Input
                        style={{ width: 100 }}
                        active
                        size="small"
                      />
                    </th>
                    <th className="ant-table-cell">
                      <Skeleton.Input
                        style={{ width: 100 }}
                        active
                        size="small"
                      />
                    </th>
                    <th className="ant-table-cell">
                      <Skeleton.Input
                        style={{ width: 100 }}
                        active
                        size="small"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody className="ant-table-tbody">
                  {Array(10)
                    .fill(null)
                    .map((_, index) => (
                      <tr key={index} className="ant-table-row">
                        <td className="ant-table-cell">
                          <Space>
                            <Skeleton.Avatar active size="small" />
                            <Skeleton.Input
                              style={{ width: 100 }}
                              active
                              size="small"
                            />
                          </Space>
                        </td>
                        <td className="ant-table-cell">
                          <Space direction="vertical" size="small">
                            <Skeleton.Input
                              style={{ width: 150 }}
                              active
                              size="small"
                            />
                            <Skeleton.Input
                              style={{ width: 100 }}
                              active
                              size="small"
                            />
                          </Space>
                        </td>
                        <td className="ant-table-cell">
                          <Skeleton.Input
                            style={{ width: 100 }}
                            active
                            size="small"
                          />
                        </td>
                        <td className="ant-table-cell">
                          <Skeleton.Button
                            style={{ width: 70 }}
                            active
                            size="small"
                          />
                        </td>
                        <td className="ant-table-cell">
                          <Skeleton.Input
                            style={{ width: 100 }}
                            active
                            size="small"
                          />
                        </td>
                        <td className="ant-table-cell">
                          <Skeleton.Input
                            style={{ width: 100 }}
                            active
                            size="small"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="ant-table-pagination ant-table-pagination-right"
            style={{ marginTop: 16 }}
          >
            <Skeleton.Button active style={{ width: 300 }} />
          </div>
        </div>
      </Card>
    </div>
  );
}
