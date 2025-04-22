"use client";
import {
    Card,
    Typography,
    Button,
    List,
    Space,
    theme,
    Descriptions,
    Flex,
} from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

import { Content, Header } from "antd/es/layout/layout";
import { checkCustomPages, customPageWordpress } from "../../graphql/actions/pages";
import Pages from "./Pages";
import Wordpress from "./Wordpress";


const { Title, Paragraph, Text } = Typography;

export default function ManageWebsite() {
    const { token } = theme.useToken();
    const { data, loading, refetch } = checkCustomPages({
        pollInterval: 7000,
    });
    const onCompleted = () => {
        refetch();
    };
    const [create, { loading: btnLoading }] = customPageWordpress({
        onCompleted,
    });
    return (
        <Content style={{ padding: "24px" }}>
            <Typography.Paragraph style={{ marginBottom: "24px" }}>
                Create and manage your school pages here
            </Typography.Paragraph>
            <Card>
                <Title level={4}>Manage WordPress</Title>
                <Paragraph>
                    thrico allows you to use WordPress to manage pages on your website.
                </Paragraph>

                <List
                    itemLayout="horizontal"
                    dataSource={[
                        "WordPress is used only for page building for your convenience. Your real website on thrico is not served via WordPress.",
                        <>
                            Custom pages you build inside WordPress automatically gets
                            published via thrico{" "}
                            <Text strong>when you press Sync WordPress with thrico</Text>{" "}
                            button below.
                        </>,
                        <>
                            Make sure to press on{" "}
                            <Text strong>Sync WordPress with thrico</Text> button below
                            whenever you want to make all changes live on your website.
                            Without that, your WordPress changes will not be synced and will
                            be lost on refresh.
                        </>,
                        "This is a temporary WordPress instance. If you don't use it for 20-30 minutes, the instance will be killed.",
                    ]}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            <Space>
                                <Text>{index + 1}.</Text>
                                <Paragraph style={{ margin: 0 }}>{item}</Paragraph>
                            </Space>
                        </List.Item>
                    )}
                />

                {!loading && (
                    <>
                        {data?.checkCustomPages?.url ? (
                            <>
                                {data?.checkCustomPages?.isReady ? (
                                    <Wordpress data={data} />
                                ) : (
                                    <>
                                        <Button
                                            loading={true}
                                            type="primary"
                                            size="large"
                                            icon={<PlayCircleOutlined />}
                                            style={{ marginTop: "16px" }}
                                        >
                                            Creating WordPress
                                        </Button>
                                    </>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                )}

                <>
                    {!data?.checkCustomPages && (
                        <Button
                            loading={loading || btnLoading}
                            onClick={() => create()}
                            type="primary"
                            size="large"
                            icon={<PlayCircleOutlined />}
                            style={{ marginTop: "16px" }}
                        >
                            Start WordPress
                        </Button>
                    )}
                </>
            </Card>
        </Content>
    );
}
