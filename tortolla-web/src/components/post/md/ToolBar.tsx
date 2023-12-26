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
import { useState } from "react";
import * as monaco from "monaco-editor";

export interface ToolBarCommandProps {
  editor: monaco.editor.IStandaloneCodeEditor;
};

export interface ToolBarProps {
  editor: monaco.editor.IStandaloneCodeEditor;
}

export default function ToolBar(props: ToolBarProps) {
  const commandProps = {
    editor: props.editor,
  };

  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    mode: [],
  });
  const onCheckedValueChange: ToolbarProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar
      checkedValues={checkedValues}
      onCheckedValueChange={onCheckedValueChange}
    >
      <Undo {...commandProps} />
      <Redo {...commandProps} />
      <ToolbarDivider />
      <Bold {...commandProps} />
      <Italic {...commandProps} />
      <Heading {...commandProps} />
      <Strike {...commandProps} />
      <Underline {...commandProps} />
      <Code {...commandProps} />
      <ToolbarDivider />
      <Quote {...commandProps} />
      <OrderedList {...commandProps} />
      <UnorderedList {...commandProps} />
      <TaskList {...commandProps} />
      <ToolbarDivider />
      <Link {...commandProps} />
      <Image {...commandProps} />
      <CodeBlock {...commandProps} />
      <ToolbarDivider />
      <ToolbarToggleButton
        value="preview"
        name="mode"
        key="preview"
        icon={<Eye20Regular />}
      />
    </Toolbar>
  );
}
