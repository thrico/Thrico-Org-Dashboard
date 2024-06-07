"use client";

import React from "react";
import { Editor, Element, Frame } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { Typography } from "antd";
const RenderNode = ({ element }) => {
  return <div style={{ background: "#000", padding: "5px" }}>{element}</div>;
};

export default function App() {
  return (
    <div style={{ margin: "0 auto", width: "800px" }}>
      <Typography variant="h5" align="center">
        A super simple page editor
      </Typography>
      <Editor onRender={RenderNode}>
        <Frame resolver={{ Hero }}>
          <Element>
            <h1>Hi</h1>
          </Element>
        </Frame>
      </Editor>
    </div>
  );
}
