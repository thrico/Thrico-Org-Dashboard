import { Button, Card } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";

const TermAndConditionMentee = () => {
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };
  const [value, setValue] = useState(`
<h1 style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 38px;">Introduction</h1> <br/>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to <span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><strong>uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development</strong></span>.</div>
<h2 style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 30px;">Guidelines and Resources</h2>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">We supply a series of design principles, practical patterns and high quality design resources (<span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><code style="font-size: 11.9px;border: 1px solid rgba(100, 100, 100, 0.2);">Sketch</code></span> and <span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><code style="font-size: 11.9px;border: 1px solid rgba(100, 100, 100, 0.2);">Axure</code></span>), to help people create their product prototypes beautifully and efficiently.</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;"><br/>
    <ul style="list-style-type: circle;">
        <li><a href="http://figma.localhost:4000/docs/spec/proximity" style="color: rgb(22, 119, 255);font-size: 14px;">Principles</a></li>
        <li><a href="http://figma.localhost:4000/docs/spec/overview" style="color: rgb(22, 119, 255);font-size: 14px;">Patterns</a></li>
        <li><a href="http://figma.localhost:4000/docs/resources" style="color: rgb(22, 119, 255);font-size: 14px;">Resource Download</a></li>
    </ul>
</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">Press <span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><kbd style="color: rgba(100, 100, 100, 0.2);font-size: 12.6px;">Esc</kbd></span> to exit...</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;"><br></div>
<h1 style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 38px;">介绍</h1>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁集团体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系 Ant Design。基于<span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><mark style="color: rgb(255, 229, 143);background-color: rgb(255, 229, 143);">『确定』和『自然』</mark></span>的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于<span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><strong>更好的用户体验</strong></span>。</div>
<h2 style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 30px;">设计资源</h2>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">我们提供完善的设计原则、最佳实践和设计资源文件（<span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><code style="font-size: 11.9px;border: 1px solid rgba(100, 100, 100, 0.2);">Sketch</code></span> 和<span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><code style="font-size: 11.9px;border: 1px solid rgba(100, 100, 100, 0.2);">Axure</code></span>），来帮助业务快速设计出高质量的产品原型。</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">
    <ul style="list-style-type: circle;">
        <li><a href="http://figma.localhost:4000/docs/spec/proximity-cn" style="color: rgb(22, 119, 255);font-size: 14px;">设计原则</a></li>
        <li><a href="http://figma.localhost:4000/docs/spec/overview-cn" style="color: rgb(22, 119, 255);font-size: 14px;">设计模式</a></li>
        <li><a href="http://figma.localhost:4000/docs/resources-cn" style="color: rgb(22, 119, 255);font-size: 14px;">设计资源</a></li>
    </ul>
</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">
    <blockquote>AntV 是蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验。 我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。</blockquote>
    <pre style="font-size: 1em;border: 1px solid rgba(100, 100, 100, 0.2);">AntV 是蚂蚁集团全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、不限可能的数据可视化最佳实践。得益于丰富的业务场景和用户需求挑战，AntV 经历多年积累与不断打磨，已支撑整个阿里集团内外 20000+ 业务系统，通过了日均千万级 UV 产品的严苛考验。
我们正在基础图表，图分析，图编辑，地理空间可视化，智能可视化等各个可视化的领域耕耘，欢迎同路人一起前行。</pre>
</div>
<div style="text-align: start;color: rgba(0, 0, 0, 0.88);background-color: rgb(255, 255, 255);font-size: 14px;">按<span style="color: rgba(0, 0, 0, 0.88);font-size: 14px;"><kbd style="color: rgba(100, 100, 100, 0.2);font-size: 12.6px;">Esc</kbd></span>键退出阅读&hellip;&hellip;</div>
  `);
  return (
    <Card extra={<Button type="primary">Saves Changes</Button>}>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={setValue}
        style={{ height: 400, fontFamily: "cursive", marginBottom: 80 }}
      />
    </Card>
  );
};

export default TermAndConditionMentee;
