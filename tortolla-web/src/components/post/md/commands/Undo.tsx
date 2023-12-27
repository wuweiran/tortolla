import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { ArrowUndo20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Undo = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.trigger("toolbar", "undo", null);
  };
  return (
    <ToolbarButton
      key={"undo"}
      icon={<ArrowUndo20Regular />}
      onClick={() => props.editor.current && execute(props.editor.current)}
    />
  );
};

export default Undo;
