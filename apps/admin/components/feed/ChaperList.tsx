import React from 'react';

const handleScroll = ({ currentTarget }: { currentTarget: EventTarget & HTMLUListElement }, onLoadMore: () => void) => {
    if (
        currentTarget.scrollTop + currentTarget.clientHeight >=
        currentTarget.scrollHeight
    ) {
        onLoadMore();
    }
};

interface Chapter {
    id: string;
    title: string;
}

interface ChapterListProps {
    chapters: Chapter[];
    onLoadMore: () => void;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, onLoadMore }) => (
    <div>
        <h2>Chapter list</h2>
        <ul
            className="list-group chapter-list"
            onScroll={e => handleScroll(e, onLoadMore)}
        >
            {chapters.map(({ id, title }) => (
                <li key={id} className="list-group-item">
                    {title}
                </li>
            ))}
        </ul>
    </div>
);

export default ChapterList;
