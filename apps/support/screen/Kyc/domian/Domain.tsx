import { Button, Flex, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { checkDomain } from "../../../graphql/actions";
import Search from "antd/es/input/Search";

const Domain = ({
  setCurrent,
  domain,
  setDomain,
  onSubmit,
  loading: submitLoading,
}) => {
  const [err, setError] = useState("");
  const { data, loading, refetch, error } = checkDomain({
    variables: {
      input: {
        domain: domain,
      },
    },
  });

  React.useEffect(() => {
    refetch({
      input: {
        domain: domain,
      },
    });
  }, [domain]);

  return (
    <Flex vertical style={{ marginTop: "2rem" }}>
      <Form.Item
        rules={[{ required: true }]}
        name="domain"
        label="Choose Domain"
      >
        <Search
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          addonBefore="https://"
          suffix=".alumnithirve.com"
          loading={loading}
          status={error ? "error" : ""}
          enterKeyHint="go"
        />

        <Flex style={{ marginTop: "1rem" }}>
          {error ? (
            <Typography.Text style={{ color: "red" }}>
              {`https://${domain}.alumnithirve.com`}
            </Typography.Text>
          ) : (
            <Typography.Text style={{ color: "green" }} color="green">
              {`https://${domain}.alumnithirve.com`}
            </Typography.Text>
          )}
        </Flex>
      </Form.Item>
      <Flex
        gap={20}
        style={{ width: "100%", marginTop: "2rem" }}
        justify="center"
        align="center"
      >
        <Button onClick={() => setCurrent(1)}>Previous</Button>
        <Button
          onClick={onSubmit}
          disabled={domain === "" || error || loading || submitLoading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default Domain;
