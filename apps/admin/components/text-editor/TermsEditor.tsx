"use client";

import { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { $getRoot } from "lexical";

// Ant Design imports
import { Card, Button, Divider, Typography, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";

// Import your toolbar plugin
import { ToolbarPlugin } from "./ToolbarPlugin";

import type { EditorState } from "lexical";

const { Title, Paragraph } = Typography;

// Theme configuration
const theme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "mb-2",
  heading: {
    h1: "text-3xl font-bold mb-4",
    h2: "text-2xl font-bold mb-3",
    h3: "text-xl font-bold mb-2",
    h4: "text-lg font-bold mb-1",
    h5: "text-base font-bold mb-1",
    h6: "text-sm font-bold mb-1",
  },
  list: {
    ul: "list-disc ml-6 mb-2",
    ol: "list-decimal ml-6 mb-2",
  },
  listitem: "mb-1",
  quote: "border-l-4 border-gray-200 pl-4 italic my-4",
  table: "border-collapse border border-gray-300 my-4",
  tableCell: "border border-gray-300 p-2",
  tableRow: "border-b border-gray-300",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    code: "bg-gray-100 p-1 rounded font-mono text-sm",
  },
};

// Node types
const nodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  LinkNode,
];

export function TermsEditor({
  initialContent,
  onSave,
  title,
  loading,
}: {
  initialContent?: string;
  onSave?: (content: string) => void;
  title: string;
  loading?: boolean;
}) {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const initialConfig = {
    editorState: initialContent ? JSON.stringify(initialContent) : null,
    namespace: "TermsAndConditionsEditor",
    theme,
    nodes,
    onError: (error: Error) => {
      console.error("Lexical Editor Error:", error);
    },
  };

  const handleSave = async () => {
    if (!editorState || !onSave) return;

    setIsSaving(true);
    try {
      let content = "";
      let isEmpty = false;

      editorState.read(() => {
        const root = $getRoot();
        isEmpty = root.getTextContent().trim() === "";
        content = JSON.stringify(editorState.toJSON());
      });

      if (isEmpty) {
        message.warning("Editor is empty");
        setIsSaving(false);
        return;
      }

      await onSave(content);
      message.success("Terms and conditions saved successfully");
    } catch (error) {
      console.error("Error saving terms and conditions:", error);
      message.error("Failed to save terms and conditions");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={isSaving || loading}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      }
      title={title}
      style={{ width: "100%" }}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <Divider style={{ margin: 0 }} />
        <div style={{ padding: 16, height: 500 }}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                aria-placeholder="Enter some text..."
                className="min-h-[400px] outline-none"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={setEditorState} />
        </div>
      </LexicalComposer>
    </Card>
  );
}
