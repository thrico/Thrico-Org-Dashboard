import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import Preview from './Preview';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'name',
        render: (text) => <>/{text}</>,
    },


    {
        title: 'Action',
        key: 'action',

        render: (_, record) => (
            <Space size="middle">

                <Button type='primary'>Publish</Button>
                <Preview data={record} />

                <Button danger  >Delete</Button>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const Pages = ({ pages }) => <Table<DataType> columns={columns} dataSource={pages} />

export default Pages;