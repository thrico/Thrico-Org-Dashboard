"use client";

import { useState } from "react";
import { Form, Button, Steps, Typography } from "antd";

import { IoIosPeople } from "react-icons/io";
import { FaRocket } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FaPeopleRoof } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import SelectPage from "./SelectPage";
import PageDetails from "./PageDetails";
import { useAddPage } from "../../graphql/actions/commany";

const { Title, Paragraph } = Typography;
const { Step } = Steps;

interface PageFormProps {
  onCompleted: (data: any) => void;
  value?: string;
}

export default function PageForm({ onCompleted, value }: PageFormProps) {
  const [form] = Form.useForm();
  const pageTypes = [
    {
      type: "education",
      title: "Academia",
      description: "Schools and universities",
      icon: <HiOutlineAcademicCap size={60} />,
    },
    {
      type: "company",
      title: "Association",
      description: "Small, medium, and large businesses",
      icon: <FaPeopleRoof size={60} />,
    },
    {
      type: "company",
      title: "Startup",
      description: "Small, medium, and large businesses",
      icon: <FaRocket size={60} />,
    },
    {
      type: "company",
      title: "Enterprise",
      description: "Small, medium, and large businesses",
      icon: <BsFillBuildingsFill size={60} />,
    },
    {
      type: "showcase",
      title: "Creator",
      description: "Sub-pages associated with an existing page",
      icon: <IoIosPeople size={60} />,
    },
  ];

  const [current, setCurrent] = useState(0);

  const [formData, setFormData] = useState({
    name: value || value,
    url: "",
    website: "",
    industry: "",
    size: "",
    type: "",
    tagline: "",
    logo: {
      file: null,
      url: null,
    },
  });
  const [pageType, setPageType] = useState<string | null>(null);

  const handlePageTypeSelect = (type: string) => {
    setPageType(type);
    setCurrent(1);
  };

  const next = () => {
    form.validateFields().then((values) => {
      setFormData({ ...formData, ...values });
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const [add, { loading }] = useAddPage({
    async onCompleted(data: any) {
      onCompleted(data);
      form.resetFields();
      setCurrent(0);
    },
  });

  const onFinish = (values: any) => {
    const { logo, ...restFormData } = formData;
    add({
      variables: {
        input: {
          ...restFormData,
          logo: logo.file ?? undefined,
          pageType: pageType ?? undefined,
        },
      },
    });
  };

  const steps = [
    {
      title: "Select Page Type",

      content: (
        <SelectPage pageTypes={pageTypes} onSelect={handlePageTypeSelect} />
      ),
    },
    {
      title: "Page Details",

      content: (
        <PageDetails formData={formData} form={form} onFinish={onFinish} />
      ),
    },
    {
      title: "Confirmation",
      content: (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Title level={3}>Your page is ready to be created!</Title>
          <Paragraph>
            Review your information before creating your Thrico page.
          </Paragraph>
          <div style={{ margin: "40px 0" }}>
            <Button
              loading={loading}
              type="primary"
              size="large"
              onClick={onFinish}
            >
              Create page
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Steps current={current} style={{ marginBottom: 40 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div>{steps[current]?.content}</div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
        {current > 0 && current < steps.length - 1 && (
          <Button style={{ marginRight: 8 }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && current > 0 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
