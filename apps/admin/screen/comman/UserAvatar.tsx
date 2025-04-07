import React from "react";
import { Avatar } from "antd";

interface UserAvatarProps {
    src?: string;
    size?: number;
    style?: React.CSSProperties;
    onPress?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, size, style, onPress }) => {


    const avatar = src
        ? `https://cdn.thrico.network/${src}`
        : ``;

    return (
        <Avatar
            style={{ ...style, cursor: onPress ? "pointer" : "default" }}
            size={size || 20}
            src={avatar}
            onClick={onPress} // Ant Design uses onClick for click events
        />
    );
};

export default UserAvatar;
