"use client";

import { Button, Card, Form, Spin, Switch } from "antd";

import SettingForm from "./SettingForm";

import {
  getUserSettings,
  updateUserSettings,
} from "../../../graphql/actions/user/setting";

const Settings = () => {
  const { data, loading } = getUserSettings({});
  const [update, { loading: loadingBtn }] = updateUserSettings({});
  return (
    <>
      {!loading && (
        <SettingForm
          update={update}
          loading={loadingBtn}
          data={data?.getUserSettings}
        />
      )}
      {loading && <Spin />}
    </>
  );
};

export default Settings;
