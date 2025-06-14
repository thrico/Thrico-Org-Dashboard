"use client";

import React, { useState } from "react";

import { Card, Flex, Form, Select, Steps, Typography } from "antd";

import AuthLayout from "@thrico/ui/AuthLayout";
import Profile from "./profile/Profile";
import Organization from "./entity/Entity";
import { getEntity, registerOrganization } from "../../graphql/actions";
import Domain from "./domian/Domain";
import toast from "react-hot-toast";
import { generateSlug } from "random-word-slugs";

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;
interface KycFormData {
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

const KycForm = ({ user, entity }: { data: KycFormData }) => {
  const { refetch } = getEntity();
  const [form] = Form.useForm();
  console.log(user);

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
    country: "",
    language: "",
    fullName: user?.firstName + " " + user?.lastName,
    email: user?.email || "",
  });
  const [organization, setOrganization] = useState({
    organizationName: "",
    entityType: "",
    industryType: "",
    website: "",
    address: "",
    language: "",
    agreement: false,
    logo: null,
  });

  const randomDomain = generateSlug();
  const [domain, setDomain] = useState(randomDomain);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(
    "https://cdn.thrico.network/thricoLogo.png"
  );

  const onSubmit = () => {
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
              title: "Entity",
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
              data={user}
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
