"use client";

import React, { useState } from "react";

import { Card, Flex, Form, Select, Steps, Typography } from "antd";

import AuthLayout from "@thrico/ui/AuthLayout";
import Profile from "./profile/Profile";
import Organization from "./entity/Entity";
import {
  getEntity,
  getKycCountries,
  registerOrganization,
} from "../../graphql/actions";
import Domain from "./domian/Domain";
import toast from "react-hot-toast";
import { generateSlug } from "random-word-slugs";
import { create } from "zustand";
import { useKycFormStore } from "../../store/kycStore";

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

  const [register, { loading: registering }] = registerOrganization({
    onCompleted() {
      toast.success("Registration completed");
      refetch();
    },
  });
  const { data, loading } = getKycCountries();

  console.log("KYC Form Data:", data);

  // Initialize profile with user data if available

  const {
    current,
    setCurrent,
    profile,
    setProfile,
    organization,
    setOrganization,
    domain,
    setDomain,
    logo,
    setLogo,
    logoPreview,
    setLogoPreview,
  } = useKycFormStore();

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
  if (loading) {
    return (
      <AuthLayout>
        <Card loading={loading}></Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {!data ? (
        <Card>
          <Text type="danger">Something went wrong. Please contact admin.</Text>
        </Card>
      ) : (
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
            {current === 0 && (
              <Profile
                fullName={(user.firstName || "") + " " + (user.lastName || "")}
                email={user.email}
                data={user}
                setProfile={setProfile}
                profile={profile}
                countries={data?.getKycCountries}
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
                loading={registering}
                domain={domain}
                setDomain={setDomain}
                setCurrent={setCurrent}
                onSubmit={onSubmit}
              />
            )}
          </Flex>
        </Card>
      )}
    </AuthLayout>
  );
};

export default KycForm;
