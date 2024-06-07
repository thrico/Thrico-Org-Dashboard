import React, { useState } from "react";
import { checkPaymentKyc } from "../graphql/actions";
import PaymentKyc from "./PaymentsKyc";

const CheckKyc = (props) => {
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data, refetch } = checkPaymentKyc();
  return (
    <>
      {!data?.checkPaymentKyc?.status && (
        <PaymentKyc open={open} setOpen={setOpen} refresh={refetch} />
      )}

      {props.children}
    </>
  );
};

export default CheckKyc;
