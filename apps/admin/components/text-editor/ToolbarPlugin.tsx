"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $createParagraphNode } from "lexical";

// Ant Design imports
import { Button, Select, Space, Tooltip, Divider } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  UndoOutlined,
  RedoOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  // Update format states based on selection
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        setIsBold(selection.hasFormat("bold"));
        setIsItalic(selection.hasFormat("italic"));
        setIsUnderline(selection.hasFormat("underline"));
      });
    });
  }, [editor]);

  // Format text handlers
  const formatBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  }, [editor]);

  const formatItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }, [editor]);

  const formatUnderline = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
  }, [editor]);

  // Block format handlers
  const formatHeading = useCallback(
    (headingSize: "h1" | "h2" | "h3") => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        $setBlocksType(selection, () => $createHeadingNode(headingSize));
        setBlockType(headingSize);
      });
    },
    [editor]
  );

  const formatParagraph = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      $setBlocksType(selection, () => $createParagraphNode());
      setBlockType("paragraph");
    });
  }, [editor]);

  const formatBulletList = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "bullet");
  }, [editor]);

  const formatNumberedList = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "number");
  }, [editor]);

  const formatQuote = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "quote");
  }, [editor]);

  // History handlers
  const undo = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }, [editor]);

  const redo = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }, [editor]);

  // Handle block type change
  const onBlockTypeChange = useCallback(
    (value: string) => {
      switch (value) {
        case "h1":
        case "h2":
        case "h3":
          formatHeading(value as "h1" | "h2" | "h3");
          break;
        case "paragraph":
          formatParagraph();
          break;
        case "bullet":
          formatBulletList();
          break;
        case "number":
          formatNumberedList();
          break;
        case "quote":
          formatQuote();
          break;
      }
    },
    [
      formatHeading,
      formatParagraph,
      formatBulletList,
      formatNumberedList,
      formatQuote,
    ]
  );

  return (
    <div
      style={{
        padding: 8,
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <Space>
        <Tooltip title="Bold">
          <Button
            type={isBold ? "primary" : "default"}
            icon={<BoldOutlined />}
            onClick={formatBold}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Italic">
          <Button
            type={isItalic ? "primary" : "default"}
            icon={<ItalicOutlined />}
            onClick={formatItalic}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Underline">
          <Button
            type={isUnderline ? "primary" : "default"}
            icon={<UnderlineOutlined />}
            onClick={formatUnderline}
            size="small"
          />
        </Tooltip>
      </Space>

      <Divider type="vertical" />

      <Select
        value={blockType}
        onChange={onBlockTypeChange}
        style={{ width: 130 }}
        size="small"
      >
        <Option value="paragraph">Paragraph</Option>
        <Option value="h1">Heading 1</Option>
        <Option value="h2">Heading 2</Option>
        <Option value="h3">Heading 3</Option>
        <Option value="bullet">Bullet List</Option>
        <Option value="number">Numbered List</Option>
        <Option value="quote">Quote</Option>
      </Select>

      <Divider type="vertical" />

      <Space>
        <Tooltip title="Bullet List">
          <Button
            icon={<UnorderedListOutlined />}
            onClick={formatBulletList}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Numbered List">
          <Button
            icon={<OrderedListOutlined />}
            onClick={formatNumberedList}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Quote">
          <Button
            icon={<DoubleRightOutlined />}
            onClick={formatQuote}
            size="small"
          />
        </Tooltip>
      </Space>

      <Divider type="vertical" />

      <Space>
        <Tooltip title="Undo">
          <Button icon={<UndoOutlined />} onClick={undo} size="small" />
        </Tooltip>
        <Tooltip title="Redo">
          <Button icon={<RedoOutlined />} onClick={redo} size="small" />
        </Tooltip>
      </Space>
    </div>
  );
}
