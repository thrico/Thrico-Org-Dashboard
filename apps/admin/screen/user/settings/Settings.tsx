"use client";

import { Button, Card, Form, Spin, Switch } from "antd";

import SettingForm from "./SettingForm";

import { entitySettings, updateEntitySettings } from "../../../graphql/actions";

const Settings = () => {
  const { data, loading } = entitySettings();
  const [update, { loading: loadingBtn }] = updateEntitySettings({});

  console.log(
    "Settings data:",
    data?.getEntitySettings?.allowNewUser,
    data?.getEntitySettings?.autoApproveUser
  );
  return (
    <>
      {!loading && (
        <SettingForm
          update={update}
          loading={loadingBtn}
          data={{
            allowNewUser: data?.getEntitySettings?.allowNewUser,
            autoApproveUser: data?.getEntitySettings?.autoApproveUser,
          }}
        />
      )}
      {loading && <Spin />}
    </>
  );
};

export default Settings;
