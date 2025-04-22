 export interface FeedProps {
    id: number;
    user: {
        avatar: string;
        firstName: string;
        lastName: string;
        about?: {
            currentPosition?: string;
        };
    };

    createdAt: string;
    privacy: "PUBLIC" | "CONNECTIONS";
    addedBy: "ENTITY" | "USER";

    description?: string
    totalReactions: number;
    totalComment: number;
    totalReShare: number;
}