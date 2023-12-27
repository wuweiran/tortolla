import { ToolbarButton } from "@fluentui/react-components";
import { ToolBarCommandProps } from "../ToolBar.tsx";
import { Link20Regular } from "@fluentui/react-icons";
import * as monaco from "monaco-editor";

const Link = (props: ToolBarCommandProps) => {
  const execute = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;
    const selection = editor.getSelection();
    if (!selection) return;
    const txt = model.getValueInRange(selection);
    editor.executeEdits("link", [
      { range: selection, text: `()[${txt}]`, forceMoveMarkers: true },
    ]);
    editor.setSelection(
      new monaco.Selection(
        selection.startLineNumber,
        selection.startColumn + 3 + txt.length,
        selection.endLineNumber,
        selection.endColumn + 3
      )
    );
  };

  return (
    <ToolbarButton
      key={"link"}
      icon={<Link20Regular />}
      onClick={() => props.editor.current && execute(props.editor.current)}
    />
  );
};

export default Link;
