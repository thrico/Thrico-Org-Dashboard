import React, { useContext, useMemo } from "react";
import {
  CaretDownFilled,
  DownOutlined,
  HolderOutlined,
  UpOutlined,
} from "@ant-design/icons";
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
import List from "./List";

interface DataType {
  key: string;
  name: string;

  link: string;
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
  { title: "Name", dataIndex: "name" },

  { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
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

const SubMenu = ({ dataSource, setDataSource }) => {
  const deleteMenu = (key: String) => {
    setDataSource((oldValues) => {
      return oldValues.filter((fruit) => fruit.key !== key);
    });
  };

  const updateMenu = (value: DataType) => {
    setDataSource(
      dataSource?.map((menu) => (menu.key === value.key ? { ...value } : menu))
    );
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState?.findIndex(
          (record) => record.key === active?.id
        );
        const overIndex = prevState?.findIndex(
          (record) => record.key === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <Card style={{ margin: 20 }}>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource?.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            pagination={false}
            style={{ width: 600 }}
            bordered
            showHeader={false}
            rowKey="key"
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={dataSource}
            expandable={{
              fixed: "left",
              columnWidth: 200,
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <Space>
                    Sub Menu
                    <UpOutlined onClick={(e) => onExpand(record, e)} />
                  </Space>
                ) : (
                  <Space>
                    Sub Menu
                    <DownOutlined onClick={(e) => onExpand(record, e)} />
                  </Space>
                ),
              expandedRowRender: (record) => (
                <List
                  data={record}
                  deleteMenu={deleteMenu}
                  updateMenu={updateMenu}
                />
              ),
            }}
          />
        </SortableContext>
      </DndContext>
    </Card>
  );
};

export default SubMenu;
