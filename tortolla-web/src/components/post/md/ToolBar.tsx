import { Toolbar, ToolbarDivider } from "@fluentui/react-components";
import { IMarkdownEditor, ToolBarProps } from "./MarkdownEditor.tsx";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
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
import Preview from "./commands/preview.tsx";

export type ToolBarCommandProps = {
  editor: ReactCodeMirrorRef;
  editorProps: IMarkdownEditor;
  containerEditor: HTMLDivElement;
  preview: HTMLDivElement;
};

export default function ToolBar(props: ToolBarProps) {
  if (
    !props.editor.current ||
    !props.containerEditor.current ||
    !props.preview.current
  ) {
    return;
  }
  const commandProps = {
    editor: props.editor.current,
    editorProps: props.editorProps,
    containerEditor: props.containerEditor.current,
    preview: props.preview.current,
  };
  return (
    <Toolbar>
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
      <Preview {...commandProps} />
    </Toolbar>
  );
}
