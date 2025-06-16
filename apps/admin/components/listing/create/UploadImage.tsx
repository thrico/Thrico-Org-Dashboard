import React, { useState } from "react";
import { Upload, message, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined, DragOutlined } from "@ant-design/icons";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const MAX_IMAGES = 4;

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

interface PhotoUploadFile extends File {
  uid: string;
  name: string;
  thumbUrl?: string;
}

const SortableImage = ({
  file,
  onRemove,
}: {
  file: PhotoUploadFile;
  onRemove: (uid: string) => void;
}) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: file.uid });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "inline-block",
    marginRight: 8,
    marginBottom: 8,
    position: "relative",
    width: 90,
    height: 90,
    border: "1px solid #d9d9d9",
    borderRadius: 4,
    overflow: "hidden",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <img
        src={file.thumbUrl}
        alt={file.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Drag handle icon */}
      <DragOutlined
        {...attributes}
        {...listeners}
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          color: "#666",
          background: "white",
          borderRadius: "50%",
          padding: 4,
          fontSize: 14,
          cursor: "grab",
        }}
      />

      {/* Delete with confirmation */}
      <Popconfirm
        title="Are you sure to delete this image?"
        onConfirm={() => onRemove(file.uid)}
        okText="Yes"
        cancelText="No"
      >
        <DeleteOutlined
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            color: "red",
            background: "white",
            borderRadius: "50%",
            padding: 4,
            fontSize: 14,
            cursor: "pointer",
          }}
        />
      </Popconfirm>
    </div>
  );
};

const PhotoUpload = () => {
  const [fileList, setFileList] = useState<PhotoUploadFile[]>([]);

  console.log(fileList);
  const sensors = useSensors(useSensor(PointerSensor));

  const beforeUpload = async (file: PhotoUploadFile) => {
    if (fileList.length >= MAX_IMAGES) {
      message.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return Upload.LIST_IGNORE;
    }

    const preview = await getBase64(file);
    const newFile = {
      ...file,
      thumbUrl: preview,
    };

    setFileList((prev) => [...prev, newFile]);
    return Upload.LIST_IGNORE; // Prevent default upload
  };

  const handleRemove = (uid: string) => {
    setFileList((prev) => prev.filter((file) => file.uid !== uid));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fileList.findIndex((f) => f.uid === active.id);
      const newIndex = fileList.findIndex((f) => f.uid === over?.id);
      setFileList((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <>
      <Upload
        listType="picture-card"
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        {fileList.length < MAX_IMAGES && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fileList.map((file) => file.uid)}
          strategy={horizontalListSortingStrategy}
        >
          {fileList.map((file) => (
            <SortableImage key={file.uid} file={file} onRemove={handleRemove} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default PhotoUpload;
