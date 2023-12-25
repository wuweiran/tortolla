import { redo as redoHandle } from '@codemirror/commands';
import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { ArrowRedo20Regular } from "@fluentui/react-icons";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

const Redo = (props: ToolBarCommandProps) => {
  const execute = (editor: ReactCodeMirrorRef) => {
    const { view } = editor;
    if (!view) return;
    redoHandle(view);
  };
  return (
    <ToolbarButton
      key={"redo"}
      icon={<ArrowRedo20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Redo;
