import React, { useContext, useMemo } from "react";
import { HolderOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Card, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { sortFaq } from "../../../../graphql/actions/faq";

interface DataType {
  key: string;
  title: string;
  description: string;
  id: string;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const columns: ColumnsType<DataType> = [
  { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
  { key: "key", align: "center", render: (_, { key }) => <>{key}</> },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const Drag = ({ data, type }) => {
  const set = data?.map((set, index) => ({
    key: index + 1,
    ...set,
  }));
  const [dataSource, setDataSource] = React.useState<DataType[]>(set);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };
  const [updateFaq, { loading }] = sortFaq({});

  const update = () => {
    const data = dataSource.map((set) => ({
      sort: set.key,
      id: set.id,
    }));
    updateFaq({
      variables: {
        input: data,
      },
    });
  };

  return (
    <Card
      title="Sort Faqs"
      extra={
        <Space>
          {set === dataSource && <Button disabled>Update</Button>}
          {set !== dataSource && (
            <Button loading={loading} onClick={update} type="primary">
              Update
            </Button>
          )}
        </Space>
      }
    >
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource?.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            loading={loading}
            rowKey="key"
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
    </Card>
  );
};

export default Drag;
