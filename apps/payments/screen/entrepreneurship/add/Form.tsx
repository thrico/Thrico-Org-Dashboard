import React, { useCallback, useState } from "react";
import { Button, Card, Drawer, Flex, Form, Modal, Space, Steps } from "antd";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { step2Props, step3Props, stepProps } from "../ts-type";

interface props {
  refresh?: any;
}
const AddChallenge = ({ refresh }: props) => {
  console.log(refresh);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [cover, setCover] = useState<string>();
  const onCompleted = () => {
    onClose();
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [step1Data, setStep1Data] = useState<stepProps>({
    title: "",
    company: null,
    visibility: "public",
    website: null,
    challengeMode: "online",
    location: null,
    city: null,
    state: null,
    country: null,
  });

  const [step2Data, setStep2Data] = useState<step2Props>({
    contactPersonFullName: null,
    contactPersonEmail: null,
    contactPersonPhone: null,
  });

  const [step3Data, setStep3Data] = useState<step3Props>({
    participationType: null,
    minMember: 1,
    maxMember: 10,
    time: null,
    noOfRegistration: null,
  });
  const onSubmit = (values: step3Props) => {
    console.log(values);
  };
  const steps = [
    {
      title: "Basic Details",
      content: (
        <Step1 next={next} step1Data={step1Data} setStep1Data={setStep1Data} />
      ),
    },
    {
      title: "About",
      content: (
        <Step2
          step2Data={step2Data}
          setStep2Data={setStep2Data}
          next={next}
          prev={prev}
        />
      ),
    },
    {
      title: "Registration Details",
      content: <Step3 step3Data={step3Data} onSubmit={onSubmit} prev={prev} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Button
        style={{ width: "100%", marginTop: 20 }}
        type="primary"
        onClick={showDrawer}
      >
        Add
      </Button>

      <Drawer
        closeIcon={true}
        height={"100vh"}
        placement={"bottom"}
        onClose={onClose}
        open={open}
        title="Create Program & Challenge"
      >
        <Flex style={{ width: "100%" }} justify="center">
          <Card style={{ width: "70%" }}>
            <Steps current={current} items={items} />
            <Flex style={{ width: "100%", marginTop: 40 }} justify="center">
              {steps[current].content}
            </Flex>
          </Card>
        </Flex>
      </Drawer>
    </>
  );
};

export default AddChallenge;
