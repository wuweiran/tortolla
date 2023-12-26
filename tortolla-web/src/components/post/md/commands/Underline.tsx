import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { TextUnderline20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Underline = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    editor.executeEdits("underline", [
      { range: selection, text: "<u>", forceMoveMarkers: true },
      { range: new monaco.Range(selection.endLineNumber, selection.endColumn, selection.endLineNumber, selection.endColumn), text: "</u>", forceMoveMarkers: true }
    ]);
    editor.setSelection(new monaco.Selection(selection.startLineNumber, selection.startColumn + 3, selection.endLineNumber, selection.endColumn + 3));
  };
  
  return (
    <ToolbarButton
      key={"underline"}
      icon={<TextUnderline20Regular />}
      onClick={() => execute(props.editor)}
    />
  );
};

export default Underline;
