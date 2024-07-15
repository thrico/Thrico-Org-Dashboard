"use client";

import React, { useState } from "react";
import type { CascaderProps } from "antd";
import {
 
  Card,
 
  Flex,
  Form,

  Select,
  Steps,
} from "antd";

import AuthLayout from "@repo/ui/AuthLayout";
import Profile from "./profile/Profile";
import Organization from "./organization/Organization";
import { getOrganization, registerOrganization } from "../../graphql/actions";
import Domain from "./domian/Domain";
import toast from "react-hot-toast";
import { generateSlug } from "random-word-slugs";
const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const KycForm = ({ data }) => {
  const { refetch } = getOrganization();
  const [form] = Form.useForm();

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const [register, { loading }] = registerOrganization({
    onCompleted() {
      toast.success("Registration completed");
      refetch();
    },
  });
  const [current, setCurrent] = useState(0);
  const [profile, setProfile] = useState({
    designation: "",
    phone: "",
    timeZone: "",
    language: "",
    fullName:
      data?.getOrganization?.firstName + " " + data?.getOrganization?.lastName,
    email: data?.getOrganization?.email,
  });
  const [organization, setOrganization] = useState({
    organizationName: "",
    category: "",
    website: "",
    address: "",
    language: "",
    agreement: false,
    logo: null,
  });

  const randomDomain = generateSlug();
  const [domain, setDomain] = useState(randomDomain);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("https://cdn.thrico.network/Thrico_LogoMark_Color.png");

  const onSubmit = () => {
    console.log(logo)
    register({
      variables: {
        input: {
          ...organization,
          logo: logo,
          domain,
          ...profile,
        },
      },
    });

  };

  return (
    <AuthLayout>
      <Card title="Complete your's profile to continue">
        <Steps
          current={current}
          items={[
            {
              title: "Profile Info",
            },
            {
              title: "Organization",
            },
            {
              title: "Choose Domain",
            },
          ]}
        />

        <Flex style={{ marginTop: "3rem" }} align="center" justify="center">
          {/* <Profile /> */}

          {current === 0 && (
            <Profile
              setProfile={setProfile}
              profile={profile}
              setCurrent={setCurrent}
            />
          )}
          {current === 1 && (
            <Organization
              logo={logo}
              setLogo={setLogo}
              setLogoPreview={setLogoPreview}
              logoPreview={logoPreview}
              organization={organization}
              setOrganization={setOrganization}
              setCurrent={setCurrent}
            />
          )}
          {current === 2 && (
            <Domain
              loading={loading}
              domain={domain}
              setDomain={setDomain}
              setCurrent={setCurrent}
              onSubmit={onSubmit}
            />
          )}
        </Flex>
      </Card>
    </AuthLayout>
  );
};

export default KycForm;
