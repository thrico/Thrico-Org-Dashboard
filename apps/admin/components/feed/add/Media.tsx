import { Upload, Button } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";

export default function Media({
    fileList,
    setFileList,
}: {
    fileList: UploadFile[];
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}) {
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <>
            <Upload
                fileList={fileList}
                onChange={handleChange}
                multiple
                maxCount={4}
                beforeUpload={() => false}
                itemRender={() => null}
                previewFile={() => Promise.resolve("")}
                accept="image/*"
            >
                <Button type="text" icon={<PictureOutlined />} shape="circle" />
            </Upload>


        </>
    );
}
