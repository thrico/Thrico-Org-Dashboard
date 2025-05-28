import type React from "react";
import { Skeleton } from "antd";
import { Comment } from "@ant-design/compatible";
interface CommentSkeletonProps {
  count?: number;
}

const CommentSkeleton: React.FC<CommentSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="comment-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <Comment
            author={
              <Skeleton.Button
                active
                size="small"
                style={{ width: 100, height: 16 }}
              />
            }
            avatar={<Skeleton.Avatar active size="default" shape="circle" />}
            content={
              <Skeleton
                active
                paragraph={{ rows: 2, width: ["100%", "80%"] }}
                title={false}
              />
            }
            datetime={
              <Skeleton.Button
                active
                size="small"
                style={{ width: 80, height: 16 }}
              />
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
