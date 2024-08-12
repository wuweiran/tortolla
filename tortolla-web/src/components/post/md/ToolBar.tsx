import {
  Toolbar,
  ToolbarDivider,
  ToolbarProps,
  ToolbarToggleButton,
} from "@fluentui/react-components";
import Redo from "./commands/Redo.tsx";
import Undo from "./commands/Undo.tsx";
import Bold from "./commands/Bold.tsx";
import Italic from "./commands/Italic.tsx";
import Link from "./commands/Link.tsx";
import Strike from "./commands/Strike.tsx";
import Underline from "./commands/Underline.tsx";
import Quote from "./commands/Quote.tsx";
import OrderedList from "./commands/OrderedList.tsx";
import UnorderedList from "./commands/UnorderedList.tsx";
import TaskList from "./commands/TaskList.tsx";
import Heading from "./commands/Heading.tsx";
import Image from "./commands/Image.tsx";
import Code from "./commands/Code.tsx";
import CodeBlock from "./commands/CodeBlock.tsx";
import { Eye20Regular } from "@fluentui/react-icons";
import { MutableRefObject, useState } from "react";
import * as monaco from "monaco-editor";
import React from "react";

export interface ToolBarCommandProps {
  editor: MutableRefObject<monaco.editor.IStandaloneCodeEditor | undefined>;
}

export interface ToolBarProps {
  editor: MutableRefObject<monaco.editor.IStandaloneCodeEditor | undefined>;
  setPreviewVisibility?: (isVisible: boolean) => void;
}

const ToolBar = React.memo(function ToolBar(props: ToolBarProps) {
  const editor = props.editor;

  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    mode: [],
  });
  const onCheckedValueChange: ToolbarProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    if (name === "mode") {
      const isPreviewVisible = checkedItems.includes("preview");
      if (props.setPreviewVisibility) {
        props.setPreviewVisibility(isPreviewVisible);
      }
    }
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar
      checkedValues={checkedValues}
      onCheckedValueChange={onCheckedValueChange}
    >
      <Undo editor={editor} />
      <Redo editor={editor} />
      <ToolbarDivider />
      <Bold editor={editor} />
      <Italic editor={editor} />
      <Heading editor={editor} />
      <Strike editor={editor} />
      <Underline editor={editor} />
      <Code editor={editor} />
      <ToolbarDivider />
      <Quote editor={editor} />
      <OrderedList editor={editor} />
      <UnorderedList editor={editor} />
      <TaskList editor={editor} />
      <ToolbarDivider />
      <Link editor={editor} />
      <Image editor={editor} />
      <CodeBlock editor={editor} />
      <ToolbarDivider />
      <ToolbarToggleButton
        value="preview"
        name="mode"
        key="preview"
        icon={<Eye20Regular />}
      />
    </Toolbar>
  );
});

export default ToolBar;
