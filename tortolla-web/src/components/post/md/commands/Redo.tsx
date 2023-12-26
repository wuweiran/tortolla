import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { ArrowRedo20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Redo = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.trigger("toolbar", "redo", null);
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
