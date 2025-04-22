import React from "react";
import UserAvatar from "../../screen/comman/UserAvatar";
import { List, Space, Tooltip, Typography } from "antd";
import { GlobalOutlined, LockOutlined } from "@ant-design/icons";
import moment from "moment";
import { getEntity } from "../../graphql/actions";
import { FeedProps } from "./types";

const { Title, Text, Paragraph } = Typography;

// Define the AddedByType interface

const FeedUserDetails: React.FC<FeedProps> = ({
    user,
    createdAt,
    privacy,
    addedBy,
}) => {
    const { data, loading } = getEntity();
    return (
        <List loading={loading} style={{ width: "100%" }}>
            <List.Item.Meta
                avatar={
                    addedBy === "USER" ? (
                        <UserAvatar size={48} src={user?.avatar} />
                    ) : (
                        <UserAvatar size={48} src={data?.getEntity?.entity.logo} />
                    )
                }
                title={
                    <Space>
                        {addedBy === "USER" && (
                            <Text strong>
                                {user?.firstName} {user?.lastName}
                            </Text>
                        )}
                        {addedBy === "ENTITY" && (
                            <Text strong>{data?.getEntity?.entity?.name}</Text>
                        )}

                    </Space>
                }
                description={
                    <div>
                        <div>
                            <Text type="secondary">{user?.about?.currentPosition}</Text>
                            {/* <Text type="secondary">{.author?.role}</Text> */}
                        </div>
                        <Space>
                            <Text type="secondary">{moment(createdAt).fromNow()}</Text>
                            <Tooltip title={privacy === "PUBLIC" ? "Public" : "Private"}>
                                {privacy === "PUBLIC" ? <GlobalOutlined /> : <LockOutlined />}
                            </Tooltip>
                        </Space>
                    </div>
                }
            />
        </List>
    );
};

export default FeedUserDetails;
