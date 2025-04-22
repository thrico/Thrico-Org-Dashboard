import { PlayCircleOutlined } from '@ant-design/icons'
import { Button, Descriptions, Flex, Space } from 'antd'
import React from 'react'
import Pages from './Pages'
import { syncWordPressPages } from '../../graphql/actions/pages'

const Wordpress = ({ data }) => {
    const [sync, { loading }] = syncWordPressPages({})
    return (
        <Flex vertical gap={20}>
            <Space>
                <a
                    target="_blank"
                    href={`https://${data?.checkCustomPages?.entity}.thrico.website`}
                >
                    <Button type="primary" icon={<PlayCircleOutlined />}>
                        Open WordPress
                    </Button>
                </a>
                <Button onClick={() => sync()} loading={loading} >Sync Pages</Button>
            </Space>

            <Descriptions
                title="Credentials"
                items={[
                    {
                        key: "1",
                        label: "UserName",
                        children: data?.checkCustomPages?.userName,
                    },
                    {
                        key: "2",
                        label: "Password",
                        children: data?.checkCustomPages?.password,
                    },
                ]}
            />

            <Pages pages={data?.checkCustomPages?.pages} />
        </Flex>
    )
}

export default Wordpress