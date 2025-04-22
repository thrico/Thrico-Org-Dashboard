import { CloseCircleTwoTone } from '@ant-design/icons';
import { Flex, Image, UploadFile } from 'antd';
import React, { useMemo } from 'react'

function AllMedia({ fileList, setFileList }: {
    fileList: UploadFile[];
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}) {

    const allImages = useMemo(() => {
        return fileList.map((file) => ({
            uid: file.uid,
            name: file.name || "",
            url:
                file.url ||
                (file.originFileObj ? URL.createObjectURL(file.originFileObj) : ""),
            status: file.status as "done" | "uploading" | "error",
            isExternalUrl: false,
        }));
    }, [fileList]);
    return (
        <>
            {allImages.length > 0 && (
                <Flex gap={10}>
                    {allImages.map((img) => (
                        <Flex vertical>
                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={img.url}
                                    alt={img.name}
                                    width={100}
                                    height={100}
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />

                                <CloseCircleTwoTone
                                    width={40}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,

                                        borderRadius: "50%",
                                        cursor: "pointer",

                                        padding: "4px",
                                    }}
                                    onClick={() =>
                                        setFileList((prev) =>
                                            prev.filter((file) => file.uid !== img.uid)
                                        )
                                    }
                                />
                            </div>
                        </Flex>
                    ))}
                </Flex>
            )}
        </>
    )
}

export default AllMedia