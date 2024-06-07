import {
  Button,
  Card,
  Flex,
  Form,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import { title } from "process";
import React from "react";

interface props {
  fileList: UploadFile[];
  setFileList: (file: UploadFile[]) => void;
  title: string;
}
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { UploadOutlined } from "@ant-design/icons";

const UploadGallery = ({ fileList, setFileList, title }: props) => {
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  interface DraggableUploadListItemProps {
    originNode: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >;
    file: UploadFile<any>;
  }

  const DraggableUploadListItem = ({
    originNode,
    file,
  }: DraggableUploadListItemProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: file.uid,
    });
    const style: React.CSSProperties = {
      transition,
      cursor: "move",
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        // prevent preview event when drag end
        className={isDragging ? "is-dragging" : ""}
        {...attributes}
        {...listeners}
      >
        {console.log(file.url)}
        {/* hide error tooltip when dragging */}
        {file.status === "error" && isDragging
          ? originNode.props.children
          : originNode}
      </div>
    );
  };
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Flex style={{ width: "100%" }} justify="center">
      <Flex style={{ width: "100%" }}>
        <Card title={`${title} Gallery`} style={{ marginBottom: 10 }}>
          <Form.Item label={` Upload up to 10 photos – ${fileList.length}/10 `}>
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
              <SortableContext
                items={fileList.map((i) => i.uid)}
                strategy={verticalListSortingStrategy}
              >
                <ImgCrop rotationSlider aspectSlider>
                  <Upload
                    listType="picture"
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    fileList={fileList}
                    onChange={onChange}
                    customRequest={dummyRequest}
                    itemRender={(originNode, file) => (
                      <DraggableUploadListItem
                        originNode={originNode}
                        file={file}
                      />
                    )}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </ImgCrop>
              </SortableContext>
            </DndContext>

            {/* <Upload
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                customRequest={dummyRequest}
              >
                {fileList.length < 10 && <Button>Upload</Button>}
              </Upload>
            </ImgCrop> */}
          </Form.Item>
        </Card>
      </Flex>
    </Flex>
  );
};

export default UploadGallery;
