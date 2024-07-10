"use client";

import { Button, Card, Form, Spin, Switch } from "antd";

import SettingForm from "./SettingForm";
import {
  getGroupSettings,
  updateGroupSettings,
} from "../../graphql/actions/group/setting";

const Settings = () => {
  const { data, loading } = getGroupSettings({});
  const [update, { loading: loadingBtn }] = updateGroupSettings({});
  return (
    <>
      {!loading && (
        <SettingForm
          update={update}
          loading={loadingBtn}
          data={data?.getGroupSettings}
        />
      )}
      {loading && <Spin />}
    </>
  );
};

export default Settings;
