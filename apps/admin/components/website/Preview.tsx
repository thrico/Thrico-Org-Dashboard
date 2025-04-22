import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const Preview = ({ data }) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={showDrawer}>
                Preview
            </Button>
            <Drawer width={1000} title="Basic Drawer" onClose={onClose} open={open}>
                <div dangerouslySetInnerHTML={{ __html: data?.content }} />
            </Drawer>
        </>
    );
};

export default Preview;