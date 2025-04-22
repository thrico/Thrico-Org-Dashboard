import { Button } from "antd";
import React from "react";
import { checkSSl } from "../../../../graphql/actions/domain";

const CheckSsl = ({ ssl, id }) => {
  const { data } = checkSSl({
    variables: {
      input: { id },
    },
    pollInterval: 200,
  });
  console.log(data);
  return <div> {!ssl && <Button loading={true}>Generating ssl</Button>} </div>;
};

export default CheckSsl;
