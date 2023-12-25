import { undo as undoHandle } from '@codemirror/commands';
import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { ArrowUndo20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

const Undo = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { view } = editor;
    if (!view) return;
    undoHandle(view);
  };
  return (
    <ToolbarButton
      key={"undo"}
      icon={<ArrowUndo20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Undo;
