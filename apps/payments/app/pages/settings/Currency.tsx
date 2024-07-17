import { Button, Card, Flex, Form, Select, Spin } from "antd";
import Link from "next/link";
import React from "react";

import { getCurrency, updateCurrency } from "../../../graphql/actions";
import { getOrganizationCurrency } from "../../../graphql/actions/user";

const Currency = () => {
  const { data, loading } = getCurrency();

  const { data: currency, loading: load } = getOrganizationCurrency();

  const [update, { loading: loadBtn }] = updateCurrency({});

  const onFinish = (values: any) => {
    update({
      variables: {
        input: values,
      },
    });
  };
  const [form] = Form.useForm();
  return (
    <Spin spinning={load && loading}>
      <Form form={form} name="validate_other" onFinish={onFinish}>
        <Card
          extra={
            <Button loading={loadBtn} htmlType="submit" type="primary">
              Update
            </Button>
          }
          title="Update Currency"
          style={{ marginBottom: 10 }}
        >
          <Card
            title={
              <>
                <Flex vertical>
                  <span>Currency</span>
                  <span style={{ fontSize: 12, fontWeight: 400 }}>
                    If you update the currency, the system will accept that
                    currency wherever the payment gateway is used{" "}
                    <Link
                      target="_blank"
                      href="https://razorpay.com/docs/api/customers/"
                    >
                      Learn more.
                    </Link>
                  </span>
                </Flex>
              </>
            }
          >
            {!load && (
              <Form.Item
                initialValue={currency?.getOrganizationCurrency?.id}
                label="Select"
                name="id"
              >
                <Select loading={loading && load}>
                  {data?.getCurrency.map((set) => (
                    <Select.Option key={set.id} value={set.id}>
                      {set.name} ({set.symbol})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Card>
        </Card>
      </Form>
    </Spin>
  );
};

export default React.memo(Currency);
